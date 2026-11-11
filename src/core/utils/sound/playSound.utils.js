import audioFiles from 'virtual:game-audio'
import customAxios from '../../services/interceptor/customAxios'
import { sounds } from '../../services/dataBase/db.json'

const metadata = new Map(sounds.map(sound => [sound.name, sound]))
const buffers = new Map()
const active = new Map()
const gains = new Map()
let context
let ready
let configLoaded = false

function unlockAudio() {
    if (!context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) return
        context = new AudioContext()
        for (const type of ['audio', 'music']) {
            const gain = context.createGain()
            gain.connect(context.destination)
            gains.set(type, gain)
            setSoundVolume(type)
        }
    }
    ready = context.state === 'running' ? Promise.resolve() : context.resume()
    ready.then(() => {
        for (const [name, playback] of active) {
            if (!playback.started) startPlayback(name, playback)
        }
    }).catch(() => {})
}

export function initSound() {
    if (!configLoaded) {
        configLoaded = true
        customAxios.get('/sounds').then(({ data }) => {
            for (const sound of data) metadata.set(sound.name, sound)
        }).catch(() => {})
    }
    window.addEventListener('pointerdown', unlockAudio, true)
    window.addEventListener('keydown', unlockAudio, true)
    return () => {
        window.removeEventListener('pointerdown', unlockAudio, true)
        window.removeEventListener('keydown', unlockAudio, true)
    }
}

function loadBuffer(name) {
    if (!buffers.has(name)) {
        const buffer = audioFiles[name]().then(encoded => {
            const binary = atob(encoded)
            const bytes = new Uint8Array(binary.length)
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
            return context.decodeAudioData(bytes.buffer)
        }).catch(error => {
            buffers.delete(name)
            throw error
        })
        buffers.set(name, buffer)
    }
    return buffers.get(name)
}

async function startPlayback(name, playback) {
    playback.started = true
    try {
        await ready
        if (active.get(name) !== playback) return
        const buffer = await loadBuffer(name)
        if (active.get(name) !== playback) return

        const source = context.createBufferSource()
        playback.source = source
        source.buffer = buffer
        source.loop = playback.loop
        source.connect(gains.get(playback.type))
        source.onended = () => {
            source.disconnect()
            if (active.get(name) === playback) active.delete(name)
        }
        source.start()
    } catch {
        if (active.get(name) === playback) active.delete(name)
    }
}

export function playSound(name) {
    if (!Object.hasOwn(audioFiles, name) || active.has(name)) return
    const { loop = false, type = 'audio' } = metadata.get(name) ?? {}
    if (!context && !loop) return

    const playback = { loop, type, started: false }
    active.set(name, playback)
    if (context) startPlayback(name, playback)
}

export function stopSound(name) {
    const playback = active.get(name)
    active.delete(name)
    playback?.source?.stop()
}

export function setSoundVolume(type) {
    const stored = Number(localStorage.getItem(type) ?? 0.5)
    if (gains.has(type) && Number.isFinite(stored)) {
        gains.get(type).gain.value = Math.max(0, Math.min(1, stored))
    }
}

export const bleepHover = () => playSound('bleep')
export const tapClick = () => playSound('tap')
export const errorSound = () => playSound('buzzer')
