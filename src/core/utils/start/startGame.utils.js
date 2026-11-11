import { errorSound, playSound, stopSound } from '../sound/playSound.utils'
import { getProgress } from '../../services/dataBase/progress'

const startGame = async (navigate, signal) => {
    try {
        const { level } = await getProgress(signal)
        if (level === 7) {
            document.getElementById('finishModal')?.classList.replace('invisible', 'visible')
            errorSound()
            return
        }

        playSound('startAdventure')
        stopSound('startmusic')
        document.getElementById('zombieHandPlace')?.classList.replace('opacity-0', 'opacity-100')
        document.getElementById('zombieHand')?.classList.replace('bottom-[-45%]', 'bottom-[8%]')
        const timer = setTimeout(() => navigate('/select-plants'), 3000)
        signal.addEventListener('abort', () => clearTimeout(timer), { once: true })
    } catch {
        if (!signal.aborted) errorSound()
    }
}

export default startGame
