import { difficultySettings, getDifficulty } from '../../utils/difficulty'
import customAxios from '../interceptor/customAxios'

const REWARDS = [
    { image: 'sunflower.png', price: 50 },
    { image: 'Wall-nut.png', price: 50 },
    { image: 'Repeatershooter.png', price: 200 },
    { image: 'Cherry-Bomb.png', price: 175 },
    { image: 'snowPeashooter.png', price: 150 },
    { image: 'medal.png', price: 0 },
]

export function getReward(level) {
    const reward = REWARDS[level - 1]
    if (level !== 1) return reward
    const price = difficultySettings[getDifficulty()].sunflowerPrice
    return { ...reward, price }
}

export function getPlantPrice(plant) {
    return plant.image === 'sunflower.png'
        ? getReward(1).price
        : Number(plant.price)
}

export async function getProgress(signal) {
    const { data } = await customAxios.get('/level', { signal })
    const progress = data[0]
    const level = Number(progress?.level)
    if (!Number.isInteger(level) || level < 1 || level > 7) throw new Error('Invalid level')
    return { ...progress, level }
}

export async function unlockReward(level, reward, signal) {
    const progress = await getProgress(signal)
    if (progress.level > level) return progress.level
    if (progress.level !== level) throw new Error('Level changed')

    const id = String(level + 1)
    const { data } = await customAxios.get('/ourPlants', { signal })
    const existing = data.find(plant => String(plant.id) === id || plant.image === reward.image)
    if (!existing) {
        await customAxios.post('/ourPlants', { id, ...reward, isBrightness: true }, { signal })
    } else if (existing.price == null) {
        await customAxios.patch(`/ourPlants/${existing.id}`, { price: reward.price }, { signal })
    }

    await customAxios.patch(`/level/${progress.id}`, { level: level + 1 }, { signal })
    return level + 1
}
