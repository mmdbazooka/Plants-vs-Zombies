import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { tapClick } from "../core/utils/sound/playSound.utils";

const Guide = () => {

    const navigate = useNavigate()

    const letsGo = () => {
        navigate("/loading")
        tapClick()
    }

    useEffect(() => {

        if(!localStorage.getItem("difficulty")) localStorage.setItem("difficulty","normal")

    }, [])

    return (
      <div className="w-full h-full grid place-content-center">
          <img src="../src/assets/images/startGame/titlescreen.jpg" alt="" className="blur-[5px] brightness-75 absolute" />

          <div className="w-[800px] h-[400px] flex flex-col justify-evenly items-center relative z-10">
              <img src="../src/assets/images/guide/GoToPlant.png" alt="" className="w-[600px]"/>
              <img src="../src/assets/images/guide/YouCanCopy.png" alt="" className="w-[400px] mt-[-50px]"/>
              <img src="../src/assets/images/guide/LetsGO.png" alt="" className="w-[200px] cursor-pointer hover:brightness-125" onClick={letsGo} onMouseOver={()=> bleep.play()}/>
          </div>
      </div>
    )
}

export default Guide