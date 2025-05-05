import { useContext } from "react"
import getSrcCard from "../core/utils/get/getSrcCard.utils"
import { context } from "../context/appContext"

const Card = ({ image , price , sunStorage }) => {

    const { setPicture , setpricePerPlant } = useContext(context)

    return (
        <div className={`card w-[60px] h-[70px] cursor-pointer relative ${sunStorage <= price-25 ? "brightness-[20%]" : ""} `} >
            <img src={"../src/assets/images/plants/" + image } alt="" className="w-[40px] h-[40px] absolute top-[10px] left-[7px]" />
            <span className="absolute bottom-0 left-[20px] text-[14px]">{ price }</span>
            <div className="w-full h-full absolute left-0 top-0 " data-price={price} data-image={image} onClick={(e)=> getSrcCard(e , sunStorage , price , setPicture , setpricePerPlant)} ></div>
        </div>
    )
}

export default Card