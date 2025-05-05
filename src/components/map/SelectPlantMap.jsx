import { useContext, useEffect } from 'react'
import customAxios from '../../core/services/interceptor/customAxios'
import selectionPlants from '../../core/utils/selectionPlants.utils'
import returnCard from '../../core/utils/returnCard.utils'
import { context } from '../../context/appContext'

const SelectPlantMap = ({ arr , bool}) => {

    const { PlantsThatWeHave , setPlantsThatWeHave , setSelectedPlants } = useContext(context)
    useEffect(() => {
        getPlants()
    }, [])

    const getPlants = async () => {
        const result = await customAxios.get("/ourPlants")
        setPlantsThatWeHave(result.data)
    }

    return (
        arr?.map((element,index) => {
            return (
                <div key={index} className={`card w-[60px] h-[70px] cursor-pointer relative ${ bool ? element.isBrightness ? "brightness-[100%]" : "brightness-[50%]" : ""}`} onClick={(e)=> bool ? selectionPlants(e,element,index,setSelectedPlants,setPlantsThatWeHave) : returnCard(element,setSelectedPlants,setPlantsThatWeHave)} >
                    <img src={"../src/assets/images/plants/" + element.image } alt="" className="w-[40px] h-[40px] absolute top-[10px] left-[7px]" />
                    <span className="absolute bottom-[-1px] left-[18px] text-[13px]">{ element.price }</span>
                    <div className="w-full h-full absolute left-0 top-0" ></div>
                </div>
            )
        })
    )

}

export default SelectPlantMap