import { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { initSound, playSound, stopSound, tapClick } from '../core/utils/sound/playSound.utils'
import { context } from '../context/AppContext'

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

const Container = () => {
    const { pathname } = useLocation()
    const { flag } = useContext(context)
    const shell = useRef(null)
    const [scale, setScale] = useState(1)
    const [fullscreen, setFullscreen] = useState(false)
    const [fullscreenError, setFullscreenError] = useState(false)
    const menuMusic = ['/start-menu', '/help', '/achievement'].includes(pathname) || pathname.startsWith('/customize-zombie')

    useEffect(initSound, [])

    useEffect(() => {
        if (!menuMusic) return
        playSound('startmusic')
        return () => stopSound('startmusic')
    }, [menuMusic])

    useEffect(() => {
        const element = shell.current
        const fit = () => {
            const active = document.fullscreenElement === element
            setFullscreen(active)
            setScale(Math.min(
                element.clientWidth / GAME_WIDTH,
                element.clientHeight / GAME_HEIGHT,
                active ? Infinity : 1,
            ))
        }
        const observer = new ResizeObserver(fit)
        observer.observe(element)
        document.addEventListener('fullscreenchange', fit)
        fit()
        return () => {
            observer.disconnect()
            document.removeEventListener('fullscreenchange', fit)
        }
    }, [])

    const toggleFullscreen = async () => {
        tapClick()
        setFullscreenError(false)
        try {
            if (document.fullscreenElement === shell.current) await document.exitFullscreen()
            else await shell.current.requestFullscreen()
        } catch {
            setFullscreenError(true)
        }
    }

    return (
        <main ref={shell} className="game-shell">
            <div id="container" onDragStart={event => event.preventDefault()}
                className={`w-[800px] h-[600px] shadow-[0_0_7px_#999] relative ${flag ? 'overflow-y-scroll' : 'overflow-hidden'} rounded-2xl`}
                style={{ transform: `scale(${scale})`, filter: `brightness(${localStorage.getItem('brightness') ?? 100}%)` }}>
                <Outlet />
            </div>
            {document.fullscreenEnabled && (
                <button type="button" onClick={toggleFullscreen} aria-pressed={fullscreen}
                    className="absolute bottom-2 right-2 z-50 rounded bg-black/80 px-3 py-1.5 text-sm text-white hover:bg-black">
                    {fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                </button>
            )}
            {fullscreenError && <p role="status" className="absolute bottom-12 right-2 rounded bg-black/80 p-2 text-white">Could not change fullscreen mode.</p>}
        </main>
    )
}

export default Container
