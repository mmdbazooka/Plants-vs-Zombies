import { Outlet, useNavigate } from "react-router-dom"
import { bleepHover, tapClick } from "../core/utils/sound/playSound.utils"
import TabTitles from "../components/customizeZombie/TabTitles"
import Holder from "../components/customizeZombie/Holder"

const CustomizeZombie = () => {

    let navigate = useNavigate()
    let flagBack = true

    const backToMain = () => {
        navigate("/start-menu")
        tapClick()
    }


    const changeBackSrc = (e) => {

        if(flagBack) {
            e.target.src = "../src/assets/images/customizeZombie/buttons/backHover.png"
            flagBack = false
        }
        else if(!flagBack) {
            e.target.src = "../src/assets/images/customizeZombie/buttons/back.png"
            flagBack = true
        }
        bleepHover()

    }

    const saveZombie = () => {
        let obj = {
            parentHairZombie : {top : parentHairZombie.style.top, right : parentHairZombie.style.right } ,
            parentFacialHairZombie : {top : parentFacialHairZombie.style.top, right : parentFacialHairZombie.style.right } ,
            parentEyewearZombie : {top : parentEyewearZombie.style.top, right : parentEyewearZombie.style.right } ,
            parentClothesZombie : {top : parentClothesZombie.style.top, right : parentClothesZombie.style.right } ,
            parentTidbitsZombie : {top : parentTidbitsZombie.style.top, right : parentTidbitsZombie.style.right } ,
            parentAccessoryZombie : {top : parentAccessoryZombie.style.top, right : parentAccessoryZombie.style.right } ,
            hairZombie : hairZombie.getAttribute("src") ,
            facialHairZombie : facialHairZombie.getAttribute("src") ,
            eyewearZombie : eyewearZombie.getAttribute("src") ,
            clothesZombie : clothesZombie.getAttribute("src") ,
            tidbitsZombie : tidbitsZombie.getAttribute("src") ,
            accessoryZombie : accessoryZombie.getAttribute("src") ,
            bgProfile : bgProfile.style.background ,
            zombieImg : zombieImg.getAttribute("src")
        }
        localStorage.setItem("zombatar" , JSON.stringify(obj))
        tapClick()
        savedModal.classList.replace("invisible" , "visible")
    }

    const closeSaved = () => {
        savedModal.classList.replace("visible" , "invisible")
        tapClick()
    }
    
    const parsedZombatar = localStorage.getItem("zombatar") ? JSON.parse(localStorage.getItem("zombatar")) : ""

    return (
        <div className="w-full h-full relative">
            <img src="../src/assets/images/customizeZombie/zombatar_finished_button.png" onClick={saveZombie} className="absolute bottom-[17%] right-[31.5%] cursor-pointer" onMouseEnter={(e) => e.target.src = "../src/assets/images/customizeZombie/zombatar_finished_button_highlight.png"} onMouseOut={(e) => e.target.src = "../src/assets/images/customizeZombie/zombatar_finished_button.png"} onMouseOver={bleepHover}  />

            <Holder id="parentHairZombie" z="120" rightStyle={parsedZombatar ? parsedZombatar.parentHairZombie.right : ""} topStyle={parsedZombatar ? parsedZombatar.parentHairZombie.top : ""} imgId="hairZombie" src={parsedZombatar.hairZombie == "" ? "" : parsedZombatar.hairZombie} />
            <Holder id="parentFacialHairZombie" z="120" rightStyle={parsedZombatar ? parsedZombatar.parentFacialHairZombie.right : ""} topStyle={parsedZombatar ? parsedZombatar.parentFacialHairZombie.top : ""} imgId="facialHairZombie" src={parsedZombatar.facialHairZombie == "" ? "" : parsedZombatar.facialHairZombie} />
            <Holder id="parentEyewearZombie" z="120" rightStyle={parsedZombatar ? parsedZombatar.parentEyewearZombie.right : ""} topStyle={parsedZombatar ? parsedZombatar.parentEyewearZombie.top : ""} imgId="eyewearZombie" src={parsedZombatar.eyewearZombie == "" ? "" : parsedZombatar.eyewearZombie} />
            <Holder id="parentClothesZombie" z="120" rightStyle={parsedZombatar ? parsedZombatar.parentClothesZombie.right : ""} topStyle={parsedZombatar ? parsedZombatar.parentClothesZombie.top : ""} imgId="clothesZombie" src={parsedZombatar.clothesZombie == "" ? "" : parsedZombatar.clothesZombie} />
            <Holder id="parentTidbitsZombie" z="105" rightStyle={parsedZombatar ? parsedZombatar.parentTidbitsZombie.right : ""} topStyle={parsedZombatar ? parsedZombatar.parentTidbitsZombie.top : ""} imgId="tidbitsZombie" src={parsedZombatar.tidbitsZombie == "" ? "" : parsedZombatar.tidbitsZombie} />
            <Holder id="parentAccessoryZombie" z="119" rightStyle={parsedZombatar ? parsedZombatar.parentAccessoryZombie.right : ""} topStyle={parsedZombatar ? parsedZombatar.parentAccessoryZombie.top : ""} imgId="accessoryZombie" src={parsedZombatar.accessoryZombie == "" ? "" : parsedZombatar.accessoryZombie} />

            <img id="mainBg" src="../src/assets/images/customizeZombie/mainBg.png" alt="" />
            <img src="../src/assets/images/customizeZombie/buttons/back.png" alt="" className="absolute bottom-[23px] left-[33%] cursor-pointer" onMouseOver={changeBackSrc} onMouseOut={changeBackSrc} onClick={backToMain} />
            <img id="zombieImg" src={parsedZombatar.zombieImg ? parsedZombatar.zombieImg : "../src/assets/images/customizeZombie/zombieColor/859279.png"} alt="" className="absolute right-[44px] top-[118.5px] z-[100]" />
            <div id="bgProfile" className="absolute right-[43px] top-[117px] w-[138.5px] h-[176px] bg-[#ccc]" style={{background :  parsedZombatar.bgProfile !== "" ? parsedZombatar.bgProfile : ""}} ></div>
            <img src="../src/assets/images/customizeZombie/zombieGif.webp" alt="" className="w-[136px] h-[150px] absolute right-[45px] bottom-[132px]" />
            <img src="../src/assets/images/customizeZombie/buttons/portrait.png" alt="" className="absolute right-[0px] top-[89px] z-[1000]" />
            <TabTitles />
            <div className="w-[404px] h-[333px] absolute left-[153px] top-[124px]">
                <Outlet />
            </div>
            <div id="savedModal" className="w-full h-full absolute left-0 top-0 flex justify-center items-center z-[1001] invisible">
                <img src="../src/assets/images/customizeZombie/saved.png" alt="" className="mb-[30px]" />
                <img src="../src/assets/images/startMenu/big_ok_button.png" alt="" className="absolute right-[26%] bottom-[32%] hover:brightness-125 cursor-pointer" onMouseOver={bleepHover} onClick={closeSaved} />
            </div>
            
        </div>
    )
}

export default CustomizeZombie