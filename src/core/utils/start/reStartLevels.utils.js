import { errorSound, tapClick } from '../sound/playSound.utils'
import customAxios from '../../services/interceptor/customAxios'
import { getProgress } from '../../services/dataBase/progress'

let resetting = false

const restartLevels = async () => {
    if (resetting) return
    resetting = true

    try {
        const progress = await getProgress()
        const { data } = await customAxios.get('/ourPlants')
        await Promise.all(data.filter(plant => String(plant.id) !== '1')
            .map(plant => customAxios.delete(`/ourPlants/${plant.id}`)))
        await customAxios.patch(`/level/${progress.id}`, { level: 1 })
        tapClick()
        document.getElementById('restartModal')?.classList.replace('invisible', 'visible')
    } catch {
        errorSound()
    } finally {
        resetting = false
    }
}

export default restartLevels
