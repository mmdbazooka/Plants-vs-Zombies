import { useState } from "react"
import arr from "../../core/services/dataBase/facialHair"

const FacialHair = () => {

    const [flag, setFlag] = useState(true)
    let baseSrc = "../src/assets/images/customizeZombie/arrows/"

    const changeSrcHover = (e) => {
      if(e.target.getAttribute("src") == baseSrc + "arrow.png" ) e.target.src = "../src/assets/images/customizeZombie/arrows/avtiveArrow.png"
    }
    const changeSrcOut = (e) => {
      if(e.target.getAttribute("src") == baseSrc + "avtiveArrow.png" ) e.target.src = "../src/assets/images/customizeZombie/arrows/arrow.png"
    }

    const changeImage = (e,i) => {

      facialHairZombie.src = e.target.getAttribute("src")
      parentFacialHairZombie.style.right = arr[i].right + "%"
      parentFacialHairZombie.style.top = arr[i].top + "%"

    }
  
  
    return (
        
        <div className="w-[400px] h-[330px] absolute flex flex-wrap pl-[12px] my-[15px]">
              <div className="w-full h-[60%] flex flex-wrap content-start [&>img]:mx-1 [&>img]:mb-[11px] [&>img]:bg-[#ccc] [&>img]:p-[3px] [&>img]:cursor-pointer [&>img]:py-[15px] [&>img]:rounded-[15px]" >

                  {
                    flag && 
                    arr.filter((element) => element.image <= 18).map((element,index) => {
                      return <img key={index} src={"../src/assets/images/customizeZombie/facialHair/facialHair (" + element.image + ").png"} alt="" className="w-[55px] h-[55px]" onClick={(e) => changeImage(e,index)} />
                    })
                  }
                  {
                    !flag && 
                    arr.filter((element) => element.image >= 18).map((element,index) => {
                      return <img key={index} src={"../src/assets/images/customizeZombie/facialHair/facialHair (" + element.image + ").png"} alt="" className="w-[55px] h-[55px]" onClick={(e) => changeImage(e,index)} />
                    })
                  }

              </div>
              <div className="w-full h-[40%] [&>img]:absolute [&>img]:cursor-pointer [&>img:nth-child(1)]:rotate-[180deg]" >
                  <img src={flag ? "../src/assets/images/customizeZombie/arrows/arrow.png" : "../src/assets/images/customizeZombie/arrows/arrow.png"} alt="" onMouseOver={changeSrcHover} onMouseOut={changeSrcOut} className="left-[40%] bottom-14" onClick={() => setFlag(true)} />
                  <img src={flag ? "../src/assets/images/customizeZombie/arrows/arrow.png" : "../src/assets/images/customizeZombie/arrows/arrow.png"} alt="" onMouseOver={changeSrcHover} onMouseOut={changeSrcOut} className="left-[50%] bottom-14" onClick={() => setFlag(false)} />
              </div>

        </div>


    )
}

export default FacialHair