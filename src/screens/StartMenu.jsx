import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setLevel , bleepHover , createArrayForOurPlants , tapClick , soundVolume , restartLevels , setPlant , startGame , submitUserName , Difficulty , Modal , Rename } from "../components/startMenu/index"
import { chnageBrightness, closeFinish, closeLess, closeMore, closeRestart, helpPageOpen, optionPageClose, optionPageOpen, quitPageClose, quitPageOpen, renameModal } from "../core/utils/start/miniFunctionOfStartMenu.utils"

const StartMenu = () => {

    let navigate = useNavigate()
    const [brightness, setBrightness] = useState(!localStorage.getItem("userName") ? "dark" : "light")
    const [userName, setUserName] = useState("")
    const [modalUserName, setModalUserName] = useState(!localStorage.getItem("userName") ? true : false)
    const [modalErorrName, setModalErorrName] = useState(false)


    useEffect(() => {

        container.scrollTop = 0
        container.style.cursor = "default"
        if(!localStorage.getItem("brightness")) container.style.filter = `brightness(100%)`
        else container.style.filter = `brightness(${localStorage.getItem("brightness")}%)`

        if(localStorage.getItem("userName")) setUserName(localStorage.getItem("userName"))

        createArrayForOurPlants()
        setLevel()
        setPlant()


        setTimeout(() => {
            startmusic.play()
            selectPlantsMusic.pause()
        }, 300);
        if(!localStorage.getItem("difficulty")) localStorage.setItem("difficulty","normal")
        else return

    }, [])

    const handleEnterName = (bool1 , bool2) => {
        setModalErorrName(bool1)
        setModalUserName(bool2)
        tapClick()
    }

    const handelSoundInp = (e) => {
        if(e.target.id == "musicInp") {
            localStorage.setItem("music",e.target.value)
            soundVolume("music")
        }
        else {
            localStorage.setItem("audio",e.target.value)
            soundVolume("audio")
        } 
    }


    return (
        <>
            <img src="../src/assets/images/startMenu/startMenuBg.png" alt="" className={brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"} />
            <img src="../src/assets/images/startMenu/startAdventure.png" alt="" className={`absolute right-[8.1%] top-[10.8%] cursor-pointer hover:brightness-[150%] ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onMouseOver={bleepHover} onClick={() => startGame(navigate)}/>
            <img src="../src/assets/images/startMenu/SelectorScreen_WoodSign2.png" alt="" className={`absolute left-[3%] top-[21%] cursor-pointer hover:brightness-[130%] ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onClick={renameModal} onMouseOver={bleepHover} />
            <img src="../src/assets/images/startMenu/SelectorScreen_WoodSign3.png" alt="" className={`absolute left-[4%] top-[30%] cursor-pointer hover:brightness-[130%] ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onClick={()=> {navigate("/customize-zombie/skin") ; tapClick()}} onMouseOver={bleepHover} />
            <img src="../src/assets/images/startMenu/quit.png" alt="" className={`absolute right-[2%] bottom-[8.5%] cursor-pointer hover:brightness-125 ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onClick={quitPageOpen} onMouseOver={bleepHover} />
            <img src="../src/assets/images/startMenu/help.png" alt="" className={`absolute right-[10.7%] bottom-[7%] cursor-pointer hover:brightness-125 ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onClick={() => helpPageOpen(navigate)} onMouseOver={bleepHover} />
            <img src="../src/assets/images/startMenu/options.png" alt="" className={`absolute right-[18.8%] bottom-[11%] cursor-pointer hover:brightness-125 ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onClick={optionPageOpen} onMouseOver={bleepHover} />
            <img src="../src/assets/images/startMenu/Achievements_pedestal.png" alt="" className={`absolute left-[2.5%] bottom-[6%] cursor-pointer hover:brightness-125 ${brightness == "dark" ? "brightness-[60%]" : "brightness-[100%]"}`} onClick={() => {navigate("/achievement") ; tapClick()}} onMouseOver={bleepHover} onMouseEnter={(e)=> {e.target.src = "../src/assets/images/startMenu/Achievements_pedestal_press.png"}} onMouseOut={(e)=> e.target.src = "../src/assets/images/startMenu/Achievements_pedestal.png"} />
            <img src="../src/assets/images/startMenu/zombieHandPlace.png" alt="" id="zombieHandPlace" className={`absolute left-[30.7%] bottom-0 z-[50] opacity-0 transition-all duration-75`} />
            <img src="../src/assets/images/startMenu/zombieHand.png" alt="" id="zombieHand" className={`absolute left-[30.5%] bottom-[-45%] z-[49]  transition-all duration-500 ease-linear`} />
            <div className={`w-full h-full absolute left-0 top-0 flex justify-center items-center ${userName ? "hidden" : ""}`}>
                {
                    modalUserName &&
                    <div className="relative">
                        <img src="../src/assets/images/startMenu/new-user.png" alt="" className="mb-[30px]" />
                        <input type="text" id="inputUserName" className="w-[82%] absolute right-[9%] bottom-[44.5%] bg-[transparent] outline-none pl-[8px] text-white placeholder:text-white" placeholder="Enter Your Name" />
                        <img src="../src/assets/images/startMenu/ok-button.png" alt="" className="absolute bottom-[17%] left-[6.7%] hover:brightness-125 cursor-pointer" onClick={() => submitUserName(setUserName , setModalUserName , setBrightness)} onMouseOver={bleepHover} />
                        <img src="../src/assets/images/startMenu/cancel_button.png" alt="" className="absolute bottom-[17%] right-[7.3%] hover:brightness-125 cursor-pointer" onClick={() => handleEnterName(true , false)} onMouseOver={bleepHover} />
                    </div>
                }
                {
                    modalErorrName && 
                    <div className="relative">
                        <img src="../src/assets/images/startMenu/error_enter_name.png" alt="" className="mb-[30px]" />
                        <img src="../src/assets/images/startMenu/big_ok_button.png" alt="" className="absolute right-[11.1%] bottom-[16.4%] hover:brightness-125 cursor-pointer" onMouseOver={bleepHover} onClick={()=> handleEnterName(false , true)} />
                    </div>
                }
            </div>
            <span id="userName" className="text-[20px] text-[#fff] absolute left-[8%] top-[13.4%] w-[225px] truncate" >{!localStorage.getItem("userName") ? userName : localStorage.getItem("userName")}</span>
            
            <Rename userName={userName} setUserName={setUserName} />

            <div id="optionModalHolder" className="w-full h-full absolute left-0 top-0 flex justify-center items-center z-50 invisible">
                <div className="relative flex flex-col justify-center items-center">
                    <img src="../src/assets/images/startMenu/optionModal.png" alt="" />
                    <img src="../src/assets/images/startMenu/okOptionModal.png" alt="" className="absolute bottom-3 ml-1 cursor-pointer hover:brightness-125" onClick={optionPageClose} onMouseOver={bleepHover} />

                    <div className="w-[140px] h-[85px] absolute right-[60px] top-[130px] flex flex-col justify-between [&>input]:w-full [&>input]:bg-transparent">
                        <input type="range" id="musicInp" min={0} max={1} step={.1} onInput={handelSoundInp} defaultValue={!localStorage.getItem("music") ? .5 : localStorage.getItem("music")} />
                        <input type="range" id="soundInp" min={0} max={1} step={.1} onInput={handelSoundInp} defaultValue={!localStorage.getItem("audio") ? .5 : localStorage.getItem("audio")} />
                        <input type="range" id="brightnessInp" onInput={chnageBrightness} min="50" max="150" autoComplete="off" defaultValue={!localStorage.getItem("brightness") ? 100 : localStorage.getItem("brightness")} />
                    </div>
                    <Difficulty />
                    <img src="../src/assets/images/startMenu/restartLevel.png" alt="" className="w-[180px] h-[45px] hover:brightness-125 cursor-pointer absolute bottom-[120px]" onMouseOver={bleepHover} onClick={restartLevels} />
                </div>
            </div>
            <div id="quitModalHolder" className="w-full h-full absolute left-0 top-0 flex justify-center items-center z-50 invisible">
                <div className="relative flex justify-center items-center">
                    <img src="../src/assets/images/startMenu/quitModal.png" alt="" />
                    <img src="../src/assets/images/startMenu/quit_cancel.png" alt="" className="absolute right-9 bottom-6 cursor-pointer hover:brightness-125" onClick={quitPageClose} onMouseOver={bleepHover} />
                    <img src="../src/assets/images/startMenu/quit_button.png" alt="" className="absolute left-8 bottom-6 cursor-pointer hover:brightness-125" onClick={()=> navigate("/closed")} onMouseOver={bleepHover} />
                </div>
            </div>
            <Modal id="finishModal" src="startMenu/finishGame.png" onClick={closeFinish} />
            <Modal id="restartModal" src="startMenu/restartLevelDone.png" onClick={closeRestart} />
            <Modal id="moreModal" src="startMenu/more.png" onClick={closeMore} />
            <Modal id="lessModal" src="startMenu/less.png" onClick={closeLess} />
        </>
    )
}

export default StartMenu