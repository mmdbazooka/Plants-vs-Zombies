import { useContext } from "react"
import { context } from "../../context/appContext"
import arr from "../../core/services/dataBase/groundGrassLength"
import plantingPlant from "../../core/utils/plantingPlants.utils"

const PlantingBlockMap = () => {

    const { sunStorage , setSunStorage , picture , setPicture , pricePerPlant , setpricePerPlant } = useContext(context)

    return (
        arr.map((element,index) => {
            return (
                <div key={index} data-left={element.left} data-top={element.parentTop} >
                    <img src="" alt="" className="scale-[80%]" />
                    <div className="w-full h-full absolute left-0 top-0 z-[1001]" data-row={element.row} data-top={element.top} data-left={element.left} onClick={(e)=> plantingPlant(e , sunStorage , setSunStorage , picture , setPicture , pricePerPlant , setpricePerPlant)}></div>
                </div>
            )
        })
    )
}

export default PlantingBlockMap