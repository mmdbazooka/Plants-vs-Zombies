import { difficultySettings } from './difficulty.js'

export const ROWS = 5
export const COLUMNS = 9
export const CELL_WIDTH = 82
export const CELL_HEIGHT = 97
export const LEFT = 32
export const TOP = 84

const ZOMBIES_PER_LEVEL = [1, 2, 4, 6, 9, 12]
const ZOMBIES = [
    { walk: 'Zombie.gif', eat: 'eatzombie.gif', hp: 1 },
    { walk: 'ConeHead_Zombie.gif', eat: 'eatkolah.gif', hp: 2 },
    { walk: 'Buckethead_Zombie.gif', eat: 'eatHalab.gif', hp: 3 },
]
const SHOOTERS = ['peashooter.png', 'Repeatershooter.png', 'snowPeashooter.png']
const MAX_X = 810
const HOUSE_X = 19
const PEA_SPEED = 245
const CUSTOM_ZOMBIE_CHANCE = 0.5

export const cellCenter = column => LEFT + (column + 0.5) * CELL_WIDTH
export const laneTop = row => TOP + row * CELL_HEIGHT

export function createLawn(level, presets = [], difficulty = 'normal') {
    const settings = difficultySettings[difficulty] ?? difficultySettings.normal
    return {
        phase: 'playing',
        presets,
        time: 0,
        sun: 50,
        nextSun: settings.sunInterval,
        nextZombie: 11,
        settings,
        remaining: Math.max(1, Math.round(ZOMBIES_PER_LEVEL[level - 1] * settings.waveMultiplier)),
        nextId: 1,
        plants: [],
        zombies: [],
        peas: [],
        suns: [],
    }
}

export function plantSeed(lawn, seed, row, column) {
    if (lawn.phase !== 'playing') return false
    const occupant = lawn.plants.find(plant => plant.row === row && plant.column === column)

    if (seed === 'shovel' && occupant) {
        lawn.plants = lawn.plants.filter(plant => plant !== occupant)
        return true
    }
    if (!seed || seed === 'shovel' || occupant || lawn.sun < seed.price) return false

    lawn.sun -= seed.price
    lawn.plants.push({
        id: lawn.nextId++,
        image: seed.image,
        row,
        column,
        hp: seed.image === 'Wall-nut.png' ? 16 : 8,
        shootAt: lawn.time,
        sunAt: lawn.time + 7,
        explodeAt: lawn.time + 2,
    })
    return true
}

export function collectSun(lawn, id) {
    if (lawn.phase !== 'playing' || !lawn.suns.some(sun => sun.id === id)) return false
    lawn.suns = lawn.suns.filter(sun => sun.id !== id)
    lawn.sun += 25
    return true
}

function addSun(lawn, x, y, life, falling = false) {
    lawn.suns.push({ id: lawn.nextId++, x, y, falling, expires: lawn.time + life })
}

function spawnZombie(lawn, random, sound) {
    const type = ZOMBIES[Math.floor(random() * ZOMBIES.length)]
    const row = Math.floor(random() * ROWS)
    lawn.zombies.push({
        ...type,
        preset: lawn.presets.length && random() < CUSTOM_ZOMBIE_CHANCE
            ? lawn.presets[Math.floor(random() * lawn.presets.length)]
            : undefined,
        id: lawn.nextId++,
        x: MAX_X,
        row,
        slowedUntil: 0,
        eating: false,
        burnedUntil: 0,
    })
    lawn.remaining--
    lawn.nextZombie += lawn.settings.spawnInterval
    sound(`groan${Math.floor(random() * 6) + 1}`)
}

function updatePlants(lawn, sound) {
    const removed = new Set()
    for (const plant of lawn.plants) {
        const x = cellCenter(plant.column)
        if (plant.image === 'sunflower.png' && lawn.time >= plant.sunAt) {
            addSun(lawn, x + 8, laneTop(plant.row) + 56, 8)
            plant.sunAt += 7
        }
        if (plant.image === 'Cherry-Bomb.png' && lawn.time >= plant.explodeAt) {
            for (const zombie of lawn.zombies) {
                if (zombie.hp > 0 && zombie.row === plant.row && Math.abs(zombie.x - x) <= 2 * CELL_WIDTH) {
                    zombie.hp = 0
                    zombie.burnedUntil = lawn.time + 0.7
                }
            }
            removed.add(plant)
            sound('cherrybomb')
        }
        if (!SHOOTERS.includes(plant.image) || lawn.time < plant.shootAt) continue
        if (!lawn.zombies.some(zombie => zombie.hp > 0 && zombie.row === plant.row && zombie.x > x + 12)) continue

        const frozen = plant.image === 'snowPeashooter.png'
        lawn.peas.push({ id: lawn.nextId++, row: plant.row, x: x + 12, frozen })
        if (plant.image === 'Repeatershooter.png') {
            lawn.peas.push({ id: lawn.nextId++, row: plant.row, x: x - 10, frozen })
        }
        plant.shootAt = lawn.time + 1.65
        sound('throwpea')
    }
    lawn.plants = lawn.plants.filter(plant => !removed.has(plant))
}

function updatePeas(lawn, seconds, sound) {
    lawn.peas = lawn.peas.filter(pea => {
        const nextX = pea.x + PEA_SPEED * seconds
        let target
        for (const zombie of lawn.zombies) {
            if (zombie.hp <= 0 || zombie.row !== pea.row || zombie.x < pea.x - 8 || zombie.x > nextX) continue
            if (!target || zombie.x < target.x) target = zombie
        }

        if (target) {
            target.hp--
            sound('splat')
            if (pea.frozen && target.hp > 0) {
                target.slowedUntil = lawn.time + 4
                sound('frozen')
            }
            return false
        }
        pea.x = nextX
        return pea.x <= MAX_X
    })
}

function updateZombies(lawn, seconds, sound) {
    lawn.zombies = lawn.zombies.filter(zombie => zombie.hp > 0 || zombie.burnedUntil > lawn.time)
    for (const zombie of lawn.zombies) {
        if (zombie.hp <= 0) continue

        const slowed = zombie.slowedUntil > lawn.time
        const nextX = zombie.x - lawn.settings.speed * seconds * (slowed ? 0.5 : 1)
        const blocker = lawn.plants.find(plant => {
            if (plant.hp <= 0 || plant.row !== zombie.row) return false
            const contact = cellCenter(plant.column) + 23
            return zombie.x >= contact && nextX <= contact
        })
        if (blocker) {
            zombie.x = cellCenter(blocker.column) + 23
            if (!zombie.eating) sound(blocker.image === 'Wall-nut.png' ? 'Chomp16s' : 'Chomp8s')
            zombie.eating = true
            blocker.hp -= seconds
        } else {
            zombie.eating = false
            zombie.x = nextX
        }

        if (zombie.x <= HOUSE_X) {
            lawn.phase = 'lost'
            break
        }
    }
    lawn.plants = lawn.plants.filter(plant => plant.hp > 0)
}

export function advanceLawn(lawn, seconds, sound, random = Math.random) {
    if (lawn.phase !== 'playing') return

    lawn.time += seconds
    if (lawn.time >= lawn.nextSun) {
        addSun(lawn, LEFT + random() * 675, TOP + random() * 405, 15, true)
        lawn.nextSun += lawn.settings.sunInterval
    }
    if (lawn.remaining > 0 && lawn.time >= lawn.nextZombie) spawnZombie(lawn, random, sound)

    lawn.suns = lawn.suns.filter(sun => sun.expires > lawn.time)
    updatePlants(lawn, sound)
    updatePeas(lawn, seconds, sound)
    updateZombies(lawn, seconds, sound)

    if (lawn.remaining === 0 && lawn.zombies.length === 0) lawn.phase = 'won'
    if (lawn.phase !== 'playing') {
        lawn.peas = []
        lawn.suns = []
    }
}
