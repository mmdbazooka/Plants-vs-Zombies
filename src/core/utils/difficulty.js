export const difficultySettings = {
    easy: { waveMultiplier: 0.75, spawnInterval: 14, speed: 12, sunInterval: 9, sunflowerPrice: 25 },
    normal: { waveMultiplier: 1, spawnInterval: 11, speed: 16, sunInterval: 9, sunflowerPrice: 50 },
    hard: { waveMultiplier: 2, spawnInterval: 5.5, speed: 24, sunInterval: 7, sunflowerPrice: 75 },
}

export function getDifficulty() {
    const difficulty = localStorage.getItem('difficulty')
    return Object.hasOwn(difficultySettings, difficulty) ? difficulty : 'normal'
}
