import { useContext, useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { tapClick } from "../core/utils/sound/playSound.utils";
import { context } from "../context/appContext";
import Audio from './map/Audio'
import soundVolume from "../core/utils/sound/soundVolume.utils";

const Container = () => {

    let navigate = useNavigate()
    let timeToStart = false
    const location = useLocation()
    const { flag  } = useContext(context)

    useEffect(() => {
        if(!localStorage.getItem("music")) localStorage.setItem("music",0.5)
        if(!localStorage.getItem("audio")) localStorage.setItem("audio",0.5)
        setTimeout(() => { timeToStart = true }, 5000);
        soundVolume("audio")
        soundVolume("music")
    }, [])

    const click = () => {
        
        if(timeToStart && location.pathname == "/loading") {
            navigate("/start-menu") 
            tapClick()
        }
    }
    
    return (
        <div id="container" onClick={click} className={`w-[800px] h-[600px] border-[#999] shadow-[0_0_7px_#999] relative ${flag ? "overflow-y-scroll" : "overflow-hidden"} rounded-2xl `}>
            <Outlet />
            <Audio />
        </div>
    )

}
export default Container