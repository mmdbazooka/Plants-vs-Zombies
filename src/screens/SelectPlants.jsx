import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customAxios from '../core/services/interceptor/customAxios'
import { getPlantPrice } from '../core/services/dataBase/progress'
import { playSound, stopSound, tapClick } from '../core/utils/sound/playSound.utils'
import SelectPlantMap from '../components/map/SelectPlantMap'
import Modal from '../components/startMenu/Modal'

const MAX_CARDS = 6

const SelectPlants = () => {
    const navigate = useNavigate()
    const [available, setAvailable] = useState([])
    const [selected, setSelected] = useState([])
    const [loadError, setLoadError] = useState(false)
    const [request, setRequest] = useState(0)
    const required = Math.min(MAX_CARDS, available.length)

    useEffect(() => {
        const controller = new AbortController()
        customAxios.get('/ourPlants', { signal: controller.signal })
            .then(({ data }) => {
                setAvailable(data.filter(plant => plant.image !== 'medal.png').map(plant => ({ ...plant, price: getPlantPrice(plant) })))
            })
            .catch(() => {
                if (!controller.signal.aborted) setLoadError(true)
            })
        return () => controller.abort()
    }, [request])

    useEffect(() => {
        playSound('selectPlantsMusic')
        return () => stopSound('selectPlantsMusic')
    }, [])

    const choose = (plant) => {
        tapClick()
        setSelected(cards => cards.length < MAX_CARDS && !cards.some(card => card.id === plant.id)
            ? [...cards, plant]
            : cards)
    }

    const remove = (plant) => {
        tapClick()
        setSelected(cards => cards.filter(card => card.id !== plant.id))
    }

    const letsRock = () => {
        tapClick()
        if (required > 0 && selected.length === required) {
            sessionStorage.setItem('selectedPlants', JSON.stringify(selected))
            navigate('/level')
        } else {
            document.getElementById('lowCardModal').classList.replace('invisible', 'visible')
        }
    }

    const retry = () => {
        setLoadError(false)
        setRequest(current => current + 1)
    }

    return (
        <>
            <img src="../src/assets/images/levels/background1.png" alt="" />
            <div className="w-full h-full absolute left-0 top-0 flex justify-center">
                <div className="w-[70%] h-full flex justify-center relative">
                    <span className="absolute top-[10%] left-[14%]">50</span>
                    <img src="../src/assets/images/selectPlants/selectorPage.png" alt="" />
                    <button type="button" aria-label="Let's Rock" disabled={!required}
                        className="w-[155px] h-[35px] absolute left-[36.5%] bottom-[22px] hover:brightness-125 disabled:opacity-50" onClick={letsRock}>
                        <img src="../src/assets/images/selectPlants/letsRock.png" alt="" />
                    </button>
                    <button type="button" aria-label="Back to menu" className="absolute right-[12%] bottom-[22px] hover:brightness-125"
                        onClick={() => { tapClick(); navigate('/start-menu') }}>
                        <img src="../src/assets/images/selectPlants/close.png" alt="" />
                    </button>
                    <div id="availablePlants" className="w-[430px] h-[365px] absolute rounded-[15px] left-[11.5%] top-[21%] bg-[#4b200c] flex flex-wrap content-start [&>*]:mx-[2px]">
                        <SelectPlantMap plants={available} disabledIds={selected.map(plant => plant.id)} onPick={choose} />
                        {loadError && (
                            <button type="button" className="m-3 text-white underline" onClick={retry}>
                                Could not load plants. Try again
                            </button>
                        )}
                    </div>
                </div>
                <div id="selectedPlants" className="w-[49%] h-[70px] absolute left-[29%] top-2 flex [&>*]:mx-[2px]">
                    <SelectPlantMap plants={selected} onPick={remove} removing />
                </div>
            </div>
            <Modal id="lowCardModal" src="selectPlants/selectMorePlants.png" onClick={() => {
                document.getElementById('lowCardModal').classList.replace('visible', 'invisible')
                tapClick()
            }} />
        </>
    )
}

export default SelectPlants
