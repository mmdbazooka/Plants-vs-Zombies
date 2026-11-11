import accessory from './accessory'
import clothes from './clothes'
import eyewear from './eyewear'
import facialHair from './facialHair'
import hair from './hair'
import hats from './hat'
import tidbits from './tidbits'

export const zombieImage = path => `../src/assets/images/customizeZombie/${path}`
export const skins = ['859279', '4e865d', '7e865d', '778131', '9ba268', '5f960a', '92b74c', '518e35', '78a762', '409b49', '6ab171', '677859']
export const backdropColors = ['0f9033', '0fc141', '6fbf20', '9e1013', '9f37f0', '30edec', '499ff0', '5549f0', '665435', 'c6f3fa', 'e2b313', 'ed1217', 'eec5fc', 'f7f6ae', 'f7f628', 'f658d6', 'f07218', 'ccc']
export const emptyZombatar = { skin: skins[0], backdrop: '#ccc', parts: {} }

const catalog = {
    hair: { folder: 'hair', items: hair, slot: 'headwear', layer: 25 },
    facial_hair: { folder: 'facialHair', items: facialHair, slot: 'facialHair', layer: 23 },
    tidbits: { folder: 'tidbits', items: tidbits, slot: 'tidbits', layer: 21 },
    eyewear: { folder: 'eyewear', items: eyewear, slot: 'eyewear', layer: 24 },
    clothes: { folder: 'clothes', items: clothes, slot: 'clothes', layer: 22 },
    accessory: { folder: 'accessory', items: accessory, slot: 'accessory', layer: 24 },
    hats: { folder: 'hat', items: hats, slot: 'headwear', layer: 25 },
}

export const costumeTabs = Object.fromEntries(Object.entries(catalog).map(([tab, { folder, items, slot, layer }]) => [
    tab,
    {
        slot,
        options: items.filter(item => item.image !== 'null').map(({ image, top, right }) => ({
            path: `${folder}/${tab === 'facial_hair' ? `facialHair (${image})` : image}.png`,
            top, right, layer, slot,
        })),
    },
]))

const partsByPath = new Map(Object.values(costumeTabs).flatMap(tab => tab.options).map(part => [part.path, part]))

export function costumeParts(preset) {
    return Object.values(preset.parts).map(path => partsByPath.get(path)).filter(Boolean)
}

function normalizePreset(preset) {
    if (!skins.includes(preset?.skin)) return null
    const backdrop = /^(#[\da-f]{3}(?:[\da-f]{3})?|rgb\([\d, ]+\)|[1-5]\.png)$/i.test(preset.backdrop)
        ? preset.backdrop
        : emptyZombatar.backdrop
    const parts = {}
    for (const path of Object.values(preset.parts ?? {}).sort()) {
        const part = partsByPath.get(path)
        if (part) parts[part.slot] = path
    }
    return { skin: preset.skin, backdrop, parts }
}

function readStored(key) {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch {
        return null
    }
}

export function readZombatars() {
    const saved = readStored('zombatarPresets')
    if (Array.isArray(saved)) return saved.map(normalizePreset).filter(Boolean)

    const legacy = readStored('zombatar')
    if (!legacy) return []
    const skin = /zombieColor\/([\da-f]{6})\.png/i.exec(legacy.zombieImg)?.[1] ?? emptyZombatar.skin
    const backdrop = /proFile\/([1-5]\.png)/.exec(legacy.bgProfile)?.[1] ?? legacy.bgProfile
    const parts = {}
    for (const key of ['hair', 'facialHair', 'tidbits', 'eyewear', 'clothes', 'accessory']) {
        const path = legacy[`${key}Zombie`]?.split('/customizeZombie/')[1]
        const part = partsByPath.get(path)
        if (part) parts[part.slot] = path
    }
    return [normalizePreset({ skin, backdrop, parts })].filter(Boolean)
}

export function saveZombatar(preset) {
    const saved = readZombatars()
    const next = normalizePreset(preset)
    const serialized = JSON.stringify(next)
    localStorage.setItem('zombatarPresets', JSON.stringify([
        ...saved.filter(item => JSON.stringify(item) !== serialized),
        next,
    ]))
}
