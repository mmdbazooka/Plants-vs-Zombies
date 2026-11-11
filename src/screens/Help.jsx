import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { playSound, tapClick } from "../core/utils/sound/playSound.utils"

const Help = () => {

    let navigate = useNavigate()
    const helpPage = useRef()

    const closeHelpPage = () => {
        navigate("/start-menu")
        tapClick()
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            helpPage?.current.classList.replace("brightness-0" , "brightness-100")
            playSound('paper')
        }, 100);
        return () => clearTimeout(timer)
    }, [])
    
    return (
        <div id="helpPage" ref={helpPage} className="w-full h-full absolute left-0 top-0 z-[9999] brightness-0 transition-all duration-1000" >
            <img src="../src/assets/images/startMenu/helpPage.png" alt="" />
            <img src="../src/assets/images/startMenu/mainMenu.png" alt="" className="absolute left-[40.7%] bottom-10 cursor-pointer hover:brightness-125" onClick={closeHelpPage} />
        </div>
    )

}

export default Help