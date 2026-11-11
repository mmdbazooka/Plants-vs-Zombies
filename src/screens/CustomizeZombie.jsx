import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { bleepHover, errorSound, tapClick } from '../core/utils/sound/playSound.utils'
import { backdropColors, costumeTabs, emptyZombatar, readZombatars, saveZombatar, skins, zombieImage } from '../core/services/dataBase/zombatar'
import ZombieAppearance from '../components/customizeZombie/ZombieAppearance'
import ZombieSprite from '../components/map/ZombieSprite'

const tabs = ['skin', ...Object.keys(costumeTabs), 'backdrops']
const PAGE_SIZE = 18

function PartPicker({ tab, preset, onSelect }) {
    const [page, setPage] = useState(0)
    const { options, slot } = costumeTabs[tab]
    const choices = [...options, { path: null, slot }]
    const first = page * PAGE_SIZE

    return (
        <div className="relative h-full px-3 py-4">
            <div className="grid grid-cols-6 gap-2">
                {choices.slice(first, first + PAGE_SIZE).map(({ path, slot }, index) => (
                    <button type="button" key={path ?? 'none'} aria-label={path ? `${tab.replace('_', ' ')} ${first + index + 1}` : 'None'}
                        aria-pressed={path ? preset.parts[slot] === path : !preset.parts[slot]}
                        className="grid w-[55px] h-[55px] place-items-center rounded-xl bg-[#ccc] p-1 hover:brightness-125 aria-pressed:ring-2 aria-pressed:ring-yellow-400"
                        onClick={() => onSelect(slot, path)}>
                        {path ? <img src={zombieImage(path)} alt="" className="max-h-full object-contain" /> : 'None'}
                    </button>
                ))}
            </div>
            {choices.length > PAGE_SIZE && (
                <div className="absolute inset-x-0 bottom-9 flex justify-center gap-5">
                    <button type="button" aria-label="Previous items" disabled={page === 0} onClick={() => setPage(page - 1)} className="rotate-180 disabled:opacity-40">
                        <img src={zombieImage('arrows/arrow.png')} alt="" />
                    </button>
                    <button type="button" aria-label="Next items" disabled={first + PAGE_SIZE >= choices.length} onClick={() => setPage(page + 1)} className="disabled:opacity-40">
                        <img src={zombieImage('arrows/arrow.png')} alt="" />
                    </button>
                </div>
            )}
        </div>
    )
}

function SkinPicker({ skin, onSelect }) {
    return (
        <>
            <img src={zombieImage('tabs/skinTab.png')} alt="" className="w-full h-full" />
            <img src={zombieImage('tabs/colors_bg.png')} alt="" className="absolute left-[68px] bottom-[26px]" />
            <div className="absolute left-[77px] bottom-[39px] w-[237px] h-[55px] flex flex-wrap items-center pl-1">
                {skins.map((color, index) => (
                    <button key={color} type="button" aria-label={`Skin ${index + 1}`} aria-pressed={color === skin}
                        className="mx-[2px] brightness-50 aria-pressed:brightness-100" onClick={() => onSelect(color)}>
                        <img src={zombieImage(`skulls/skull-${index + 1}-${color}.png`)} alt="" />
                    </button>
                ))}
            </div>
        </>
    )
}

function BackdropPicker({ backdrop, onSelect }) {
    return (
        <>
            <div className="flex gap-3 p-3">
                {[1, 2, 3, 4, 5].map(number => (
                    <button key={number} type="button" aria-label={`Backdrop ${number}`} aria-pressed={backdrop === `${number}.png`}
                        className="w-16 overflow-hidden rounded-xl aria-pressed:ring-2 aria-pressed:ring-yellow-400"
                        onClick={() => onSelect(`${number}.png`)}>
                        <img src={zombieImage(`proFile/${number}.png`)} alt="" />
                    </button>
                ))}
            </div>
            <img src={zombieImage('tabs/colors_bg.png')} alt="" className="absolute left-[68px] bottom-[26px]" />
            <div className="absolute left-[77px] bottom-[39px] w-[237px] h-[55px] flex flex-wrap items-center justify-center">
                {backdropColors.map(color => (
                    <button key={color} type="button" aria-label={`Backdrop color #${color}`} aria-pressed={backdrop === `#${color}`}
                        className="w-[17px] mx-1 brightness-50 aria-pressed:brightness-100" onClick={() => onSelect(`#${color}`)}>
                        <img src={zombieImage(`backDrops/${color}.png`)} alt="" />
                    </button>
                ))}
            </div>
        </>
    )
}

export default function CustomizeZombie() {
    const navigate = useNavigate()
    const { tab: routeTab } = useParams()
    const tab = tabs.includes(routeTab) ? routeTab : 'skin'
    const [preset, setPreset] = useState(() => readZombatars().at(-1) ?? emptyZombatar)
    const [saved, setSaved] = useState(false)
    const [saveError, setSaveError] = useState(false)

    const update = change => {
        tapClick()
        setPreset(current => ({ ...current, ...change }))
        setSaveError(false)
    }

    const selectPart = (slot, path) => {
        const parts = { ...preset.parts }
        if (path) parts[slot] = path
        else delete parts[slot]
        update({ parts })
    }

    const save = () => {
        try {
            saveZombatar(preset)
            tapClick()
            setSaved(true)
            setSaveError(false)
        } catch {
            errorSound()
            setSaveError(true)
        }
    }

    const backdrop = preset.backdrop.endsWith('.png') ? `url(${zombieImage(`proFile/${preset.backdrop}`)})` : preset.backdrop

    return (
        <div className="w-full h-full relative">
            <img src={zombieImage('mainBg.png')} alt="" />
            <div className="absolute right-[43px] top-[117px] w-[139px] h-[176px]" style={{ background: backdrop }} />
            <ZombieAppearance preset={preset} />
            <ZombieSprite zombie={{ preset, hp: 1, row: 0, eating: false }} x={644} y={460} />
            <img src={zombieImage('buttons/portrait.png')} alt="" className="absolute right-0 top-[89px] z-30 pointer-events-none" />

            <div className="absolute left-[62px] top-[128px] w-[93px] h-[322px] flex flex-col">
                {tabs.map(name => (
                    <button key={name} type="button" aria-label={name.replace('_', ' ')} aria-pressed={tab === name}
                        className="h-[11.2%] brightness-50 hover:brightness-100 aria-pressed:brightness-100" onMouseEnter={bleepHover}
                        onClick={() => { tapClick(); navigate(`/customize-zombie/${name}`) }}>
                        <img src={zombieImage(`tabTitles/${name}.png`)} className="h-full" alt="" />
                    </button>
                ))}
            </div>

            <div className="absolute left-[153px] top-[124px] w-[404px] h-[333px]">
                {tab === 'skin' && <SkinPicker skin={preset.skin} onSelect={skin => update({ skin })} />}
                {tab === 'backdrops' && <BackdropPicker backdrop={preset.backdrop} onSelect={backdrop => update({ backdrop })} />}
                {costumeTabs[tab] && <PartPicker key={tab} tab={tab} preset={preset} onSelect={selectPart} />}
            </div>

            <button type="button" aria-label="Save zombie" className="absolute bottom-[17%] right-[31.5%] hover:brightness-125" onClick={save} onMouseEnter={bleepHover}>
                <img src={zombieImage('zombatar_finished_button.png')} alt="" />
            </button>
            <button type="button" aria-label="Back to main menu" className="absolute bottom-[23px] left-[33%] hover:brightness-125"
                onClick={() => { tapClick(); navigate('/start-menu') }} onMouseEnter={bleepHover}>
                <img src={zombieImage('buttons/back.png')} alt="" />
            </button>
            {saveError && <p role="alert" className="absolute bottom-6 right-12 text-white">Could not save this zombie.</p>}
            {saved && (
                <div role="dialog" aria-label="Zombie saved" className="absolute inset-0 z-40 flex items-center justify-center">
                    <img src={zombieImage('saved.png')} alt="Zombie saved" className="mb-[30px]" />
                    <button type="button" aria-label="OK" className="absolute right-[26%] bottom-[32%] hover:brightness-125"
                        onClick={() => { tapClick(); setSaved(false) }}>
                        <img src="../src/assets/images/startMenu/big_ok_button.png" alt="" />
                    </button>
                </div>
            )}
        </div>
    )
}
