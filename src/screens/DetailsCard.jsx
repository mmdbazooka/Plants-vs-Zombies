import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bleepHover, tapClick } from "../core/utils/sound/playSound.utils";
import getInfoCard from "../core/utils/get/getInfoCard.utils";
import { context } from "../context/appContext";

const DetailsCard = () => {

    const navigate = useNavigate()
    const {cardSrc , cardName , cardDescription , setCardSrc , setCardName , setCardDescription } = useContext(context)

    useEffect(() => {
        container.style.cursor = "default"
        getInfoCard(setCardSrc , setCardName , setCardDescription )
    }, [])
    
    const selectPlant = () => {
        tapClick()
        startmusic.pause()
        navigate("/select-plants")
    }

    return (
        <div className='w-full h-full'>
            <img src="../src/assets/images/levels/detailsCard.png" alt="" />
            <img src={`../src/assets/images/plants/${cardSrc}.png`} alt="" className="w-[70px] h-[75px] absolute left-[46%] top-[25%]" />
            <span className="absolute left-[46%] top-[6%] text-white">{ cardName }</span>
            <div className="w-[287px] h-[120px] absolute left-[32%] bottom-[22%] p-2">{ cardDescription }</div>
            <img src="../src/assets/images/levels/nextLevel.png" alt="" className="absolute left-[41%] hover:brightness-125 bottom-12 cursor-pointer" onClick={selectPlant} onMouseOver={bleepHover} />
        </div>
    )
}

export default DetailsCard