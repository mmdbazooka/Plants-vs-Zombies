import { getDifficulty } from '../core/utils/difficulty'
import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getProgress, getReward, unlockReward } from '../core/services/dataBase/progress'
import { advanceLawn, cellCenter, collectSun, createLawn, laneTop, plantSeed, CELL_HEIGHT, CELL_WIDTH, COLUMNS, LEFT, ROWS, TOP } from '../core/utils/lawn'
import { errorSound, playSound, stopSound, tapClick } from '../core/utils/sound/playSound.utils'
import ZombieShowMap from '../components/map/ZombieShowMap'
import ZombieSprite from '../components/map/ZombieSprite'
import { readZombatars } from '../core/services/dataBase/zombatar'

const STEP = 50
const FIELD_PAN = -378
const CELLS = Array.from({ length: ROWS * COLUMNS }, (_, index) => ({
    row: Math.floor(index / COLUMNS),
    column: index % COLUMNS,
}))

const plantImage = (name) => `../src/assets/images/plants/${name}`
const levelImage = (name) => `../src/assets/images/levels/${name}`

function Round({ seeds }) {
    const navigate = useNavigate()
    const lawnRef = useRef(null)
    const requestRef = useRef(null)
    const [lawn, setLawn] = useState(null)
    const [pan, setPan] = useState(0)
    const [selected, setSelected] = useState(null)
    const [level, setLevel] = useState(null)
    const [loadError, setLoadError] = useState(false)
    const [attempt, setAttempt] = useState(0)
    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        requestRef.current = controller
        getProgress(controller.signal).then(progress => {
            if (progress.level === 7) navigate('/start-menu', { replace: true })
            else setLevel(progress.level)
        }).catch(() => {
            if (!controller.signal.aborted) setLoadError(true)
        })
        return () => controller.abort()
    }, [attempt, navigate])

    useEffect(() => {
        if (level == null) return
        const game = createLawn(level, readZombatars(), getDifficulty())
        lawnRef.current = game
        setLawn({ ...game })
        playSound('mainmusic')
        const preview = setTimeout(() => setPan(-600), 350)
        const center = setTimeout(() => setPan(FIELD_PAN), 1600)
        let loop
        const start = setTimeout(() => {
            loop = setInterval(() => {
                advanceLawn(game, STEP / 1000, playSound)
                setLawn({ ...game })
                if (game.phase !== 'playing') {
                    clearInterval(loop)
                    stopSound('mainmusic')
                    stopSound('Chomp8s')
                    stopSound('Chomp16s')
                    playSound(game.phase === 'lost' ? 'losemusic' : 'winmusic')
                }
            }, STEP)
        }, 2250)

        return () => {
            clearTimeout(preview)
            clearTimeout(center)
            clearTimeout(start)
            clearInterval(loop)
            for (const name of ['mainmusic', 'losemusic', 'winmusic', 'Chomp8s', 'Chomp16s']) stopSound(name)
            lawnRef.current = null
        }
    }, [level])

    const choose = (seed) => {
        if (seed !== 'shovel' && lawn.sun < seed.price) {
            setSelected(null)
            errorSound()
            return
        }
        playSound(seed === 'shovel' ? 'shovel' : 'selectSeed')
        setSelected(current => current === seed ? null : seed)
    }

    const place = (row, column) => {
        if (!selected) return
        if (plantSeed(lawnRef.current, selected, row, column)) {
            if (selected !== 'shovel') playSound('plant')
            setSelected(null)
            setLawn({ ...lawnRef.current })
        } else {
            errorSound()
        }
    }

    const pickSun = (id) => {
        if (collectSun(lawnRef.current, id)) {
            playSound('points')
            setLawn({ ...lawnRef.current })
        }
    }

    const reward = level && getReward(level)
    const claim = async () => {
        setSaving(true)
        setSaveError(false)
        const { signal } = requestRef.current
        try {
            const next = await unlockReward(level, reward, signal)
            if (!signal.aborted) navigate(next === 7 ? '/start-menu' : '/details-card')
        } catch {
            if (signal.aborted) return
            setSaveError(true)
            setSaving(false)
        }
    }

    const leave = () => {
        playSound('pauseSound')
        navigate('/start-menu')
    }

    const centered = pan === FIELD_PAN
    const playing = centered && lawn?.phase === 'playing'
    const cursor = selected === 'shovel' ? 'bil.png' : selected?.image.replace('.png', '-cursor.png')

    return (
        <div className="relative w-full h-full" style={{ cursor: playing && cursor ? `url(${plantImage(cursor)}), auto` : undefined }}>
            <div className="w-[1400px] h-full flex absolute top-0 left-0 transition-transform duration-700 ease-in-out" style={{ transform: `translateX(${pan}px)` }}>
                {[3, 1, 2].map(num => <img key={num} src={levelImage(`background${num}.png`)} className="shrink-0" alt="" />)}
                {!centered && pan !== 0 && (
                    <div dir="rtl" className="clipPass w-[23%] h-full absolute right-[2%] top-[5%] rotate-[-15deg]">
                        <ZombieShowMap />
                    </div>
                )}
            </div>

            {centered && lawn && (
                <>
                    <div className="absolute left-[22px] top-0 z-30 w-[450px]">
                        <img src={levelImage('SeedBank.png')} alt="" />
                        <div className="absolute left-[78px] top-2 flex gap-0">
                            {seeds.map(seed => (
                                <button key={seed.id} type="button" aria-label={`Plant ${seed.image.replace('.png', '')}`}
                                    aria-pressed={selected === seed} disabled={!playing}
                                    className={`card relative w-[60px] h-[70px] ${lawn.sun < seed.price ? 'brightness-50' : ''} ${selected === seed ? 'outline outline-2 outline-yellow-300' : ''}`}
                                    onClick={() => choose(seed)}>
                                    <img src={plantImage(seed.image)} alt="" className="w-[40px] h-[40px] absolute top-[10px] left-[7px]" />
                                    <span className="absolute bottom-0 left-[18px] text-[13px]">{seed.price}</span>
                                </button>
                            ))}
                        </div>
                        <span aria-label="Sun" className="absolute left-[14px] bottom-[5px] w-[53px] h-5 text-center">{lawn.sun}</span>
                        <button type="button" aria-label="Shovel" aria-pressed={selected === 'shovel'} disabled={!playing}
                            className="absolute left-full top-0 w-[70px]" onClick={() => choose('shovel')}>
                            <img src={plantImage('bilPlace.png')} alt="" />
                        </button>
                    </div>

                    <div className="absolute grid grid-cols-9 z-10" style={{ left: LEFT, top: TOP, width: CELL_WIDTH * COLUMNS, gridAutoRows: CELL_HEIGHT }}>
                        {CELLS.map(({ row, column }) => (
                            <button key={row * COLUMNS + column} type="button" aria-label={`Row ${row + 1}, column ${column + 1}`}
                                disabled={!playing} className="focus-visible:outline-yellow-300" onClick={() => place(row, column)} />
                        ))}
                    </div>
                    {lawn.plants.map(plant => (
                        <img key={plant.id} src={plantImage(plant.image)} alt="" data-plant={plant.image}
                            className="absolute w-[72px] h-[80px] object-contain pointer-events-none -translate-x-1/2"
                            style={{ left: cellCenter(plant.column), top: laneTop(plant.row) + 9 }} />
                    ))}
                    {lawn.zombies.map(zombie => (
                        <ZombieSprite key={zombie.id} zombie={zombie} x={zombie.x - 18} y={laneTop(zombie.row) + 93}
                            slowed={zombie.slowedUntil > lawn.time} />
                    ))}
                    {lawn.peas.map(pea => (
                        <img key={pea.id} src={plantImage(pea.frozen ? 'SnowPea.png' : 'pea.png')} alt="" data-pea=""
                            className="absolute z-[12] pointer-events-none w-5 -translate-x-1/2"
                            style={{ left: pea.x, top: laneTop(pea.row) + 30 }} />
                    ))}
                    {lawn.suns.map(sun => (
                        <button key={sun.id} type="button" aria-label="Collect sun"
                            className={`absolute z-20 w-[55px] h-[55px] hover:brightness-125 ${sun.falling ? 'falling-sun' : ''}`}
                            style={{ left: sun.x, top: sun.y }} onClick={() => pickSun(sun.id)}>
                            <img src={levelImage('sun.png')} alt="" />
                        </button>
                    ))}
                </>
            )}

            <button type="button" aria-label="Main menu" className="absolute z-30 right-2 top-0 w-[170px] hover:brightness-125" onClick={leave}>
                <img src={levelImage('mainMenu.png')} alt="" />
            </button>

            {loadError && (
                <button type="button" className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 bg-black p-3 text-white" onClick={() => {
                    setLoadError(false)
                    setAttempt(current => current + 1)
                }}>
                    Could not load the level. Try again
                </button>
            )}
            {lawn?.phase === 'lost' && (
                <div role="dialog" aria-label="Game over" className="absolute inset-0 z-40 grid place-content-center bg-black/60">
                    <img src={levelImage('gameOver.png')} alt="Game over" />
                    <button type="button" aria-label="Try again" className="justify-self-center -mt-[63px] hover:brightness-125"
                        onClick={() => { tapClick(); navigate('/select-plants') }}>
                        <img src={levelImage('tryAgain_button.png')} alt="" />
                    </button>
                </div>
            )}
            {lawn?.phase === 'won' && (
                <div className="absolute inset-0 z-[25] flex flex-col items-center justify-center bg-black/40">
                    <button type="button" aria-label="Claim reward" disabled={saving} onClick={claim}
                        className="card relative w-[76px] h-[92px] hover:brightness-125 disabled:brightness-75">
                        <img src={plantImage(reward.image)} alt="" className="w-[52px] h-[52px] absolute top-3 left-3" />
                        <span className="absolute bottom-1 inset-x-0">{reward.image === 'medal.png' ? 'Medal' : reward.price}</span>
                    </button>
                    {saveError && <span role="alert" className="mt-2 bg-black p-2 text-white">Could not save progress. Click the reward to retry.</span>}
                </div>
            )}
        </div>
    )
}

const Level = () => {
    let seeds
    try {
        seeds = JSON.parse(sessionStorage.getItem('selectedPlants'))
    } catch {
        seeds = null
    }
    return Array.isArray(seeds) && seeds.length > 0
        ? <Round seeds={seeds} />
        : <Navigate to="/select-plants" replace />
}

export default Level
