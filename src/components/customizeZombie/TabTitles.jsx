import { useLocation, useNavigate } from "react-router-dom"
import { bleepHover, tapClick } from "../../core/utils/sound/playSound.utils"

const TabTitles = () => {

    let tabTitles = ["skin", "hair" , "facial_hair" , "tidbits" , "eyewear" , "clothes" , "accessory" , "hats" , "backdrops"] 

    let navigate = useNavigate()
    const location = useLocation()

    const changeTab = (e,el) => {

        tapClick()
        for(let i = 0; i < e.target.parentNode.children.length;i++) e.target.parentNode.children[i].className = "brightness-50"
        if(e.target.className == "brightness-50") navigate(`/customize-zombie/${el}`)
        e.target.className = "brightness-100"
    
    }

    return (
        <div className="w-[93px] h-[322px] absolute left-[62px] top-[128px] [&>img]:h-[11.2%] [&>img]:cursor-pointer">

            {
              tabTitles.map((el,index)=> {
                return <img key={index} src={`../src/assets/images/customizeZombie/tabTitles/${el}.png`} className={el == location.pathname.slice(location.pathname.lastIndexOf("/")+1) ? "brightness-100" : "brightness-50 hover:brightness-100"} alt="" onClick={(e) => changeTab(e,el)} onMouseOver={bleepHover} />
              })
            }

        </div>

    )
}

export default TabTitles