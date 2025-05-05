import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { tapClick } from "../core/utils/sound/playSound.utils"
import { context } from "../context/appContext"

const Achievement = () => {

    let navigate = useNavigate()
    const {setflag} = useContext(context)

    useEffect(() => {
        setflag(true)
        return () => {
            setflag(false)
        }
    }, [])

    const backToMenu = () => {
      navigate("/start-menu")
      tapClick()
    }

  return (
    <div className="relative overflow-y-scroll">
        <img src="../src/assets/images/achievement/background.png" className="w-full h-[3970px]" />
        <img src="../src/assets/images/achievement/backBtn.png" className="absolute left-[12%] top-[.3%] hover:brightness-125 cursor-pointer" onClick={backToMenu} onMouseOver={()=> bleep.play()}/>

        <div className="w-[75%] h-[240px] absolute bottom-[10%] left-24 flex flex-col justify-between">
          <img src="../src/assets/images/achievement/created-by.png" className="w-[300px] self-center mt-2" />
          <div className="w-full mb-7 flex justify-evenly items-center [&>img]:w-[300px]">
            <img src="../src/assets/images/achievement/M.png" className="" />
            <img src="../src/assets/images/achievement/H.png" className="" />
          </div>
        </div>
    </div>
  )
}

export default Achievement