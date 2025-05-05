import { useEffect } from "react";
import loadingShow from "../core/utils/start/loading.utils";


const Loading = () => {

    const HoverOnTextLoading = () => textLoading.classList.replace("text-[#d9b720]","text-[#f9590f]")
    const HoverOutTextLoading = () => textLoading.classList.replace("text-[#f9590f]","text-[#d9b720]")
    
    useEffect(() => {
        loadingShow()
        return () => {
            container.className += "cursor-pointer"
        }
    }, [])
    
    return (
        <>
            <img src="../src/assets/images/startGame/titlescreen.jpg" alt="" />
            <img src="../src/assets/images/startGame/textTitlescreen.png" alt="" className="absolute top-[0%]" />
            <div className="w-[300px] h-[50px] absolute bottom-[15px] right-[29%]" onMouseOver={HoverOnTextLoading} onMouseOut={HoverOutTextLoading}>
                <img id="loadBarDirt" src="../src/assets/images/startGame/LoadBar_dirt.png" alt="" className="absolute bottom-0 z-[6] " onMouseOver={HoverOnTextLoading} onMouseOut={HoverOutTextLoading}/>
                <div className="grass moveGrassLoasding relative transition-all duration-500 ease-linear h-[50px] z-[10] top-[-15px] right-[2px]" style={{width:"0px"}}></div>
            </div>
            <div className="w-full h-[25px] absolute bottom-[28px] z-[6] flex justify-center items-center">
                <span id="textLoading" className="text-[#d9b720] text-[22px] ml-[25px]">LOADING...</span>
            </div>
            <img src="../src/assets/images/startGame/LoadBar_circleGrass.png" alt="" className="moveSircleLoading absolute bottom-[53px] left-[31%] z-[50]" />
            <img id="zombieHead" src="../src/assets/images/startGame/LoadBar_zombieHead.png" alt="" className="absolute bottom-[25px] right-[37%] z-[5] transition-all duration-500 " />
            <img id="flower1" src="../src/assets/images/startGame/LoadBar_flower.png" alt="" className="absolute bottom-[25px] right-[47%] z-[5] transition-all duration-500 scale-y-[80%]" />
            <img id="flower2" src="../src/assets/images/startGame/LoadBar_flower.png" alt="" className="absolute bottom-[25px] right-[54%] z-[5] transition-all duration-500 scale-x-[-1]" />
            <img id="flower3" src="../src/assets/images/startGame/LoadBar_flower.png" alt="" className="absolute bottom-[25px] right-[61%] z-[5] transition-all duration-500 scale-[80%]" />
        </>
    )
}

export default Loading