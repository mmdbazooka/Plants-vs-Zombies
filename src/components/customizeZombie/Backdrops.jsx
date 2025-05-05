import { useRef, useState } from "react"

const Backdrops = () => {

    let images = ["0f9033","0fc141","6fbf20","9e1013","9f37f0","30edec","499ff0","5549f0","665435","c6f3fa","e2b313","ed1217","eec5fc","f7f6ae","f7f628","f658d6","f07218","ccc"]
    const [flag, setFlag] = useState(true)
    const parentSkull = useRef()


    const changeBackGroundSrc = (e) => { 
        bgProfile.style.background = `url(${e.target.getAttribute("src")})`
        if(e.target.getAttribute("src").indexOf("5") !== -1) setFlag(true)
        else setFlag(false)
    }
    const changeBackGroundColor = (e) => { 
        bgProfile.style.background = `#${e.target.getAttribute("data-color")}`
        for(let i = 0 ; i < parentSkull?.current.children.length ; i++) { 
            parentSkull?.current.children[i].classList.replace("brightness-100","brightness-[40%]")
        }
        e.target.classList.replace("brightness-[40%]","brightness-100")

    }

    return (
       
            <div className="w-[404px] h-[333px]">
                <div className="absolute left-0 top-0 w-full h-[100px] flex items-center [&>img]:w-[64px] [&>img]:m-2 [&>img]:rounded-[15px] [&>img]:cursor-pointer pt-[5px]" >
                    <img src="../src/assets/images/customizeZombie/proFile/1.png" alt="" onClick={changeBackGroundSrc} />
                    <img src="../src/assets/images/customizeZombie/proFile/2.png" alt="" onClick={changeBackGroundSrc} />
                    <img src="../src/assets/images/customizeZombie/proFile/3.png" alt="" onClick={changeBackGroundSrc} />
                    <img src="../src/assets/images/customizeZombie/proFile/4.png" alt="" onClick={changeBackGroundSrc} />
                    <img src="../src/assets/images/customizeZombie/proFile/5.png" alt="" onClick={changeBackGroundSrc} />
                </div>
                <img src="../src/assets/images/customizeZombie/tabs/colors_bg.png" alt="" className="absolute left-[68px] bottom-[26px]" />
                <div ref={parentSkull} className="w-[237px] h-[55px] absolute left-[77px] bottom-[39px] flex flex-wrap items-center justify-center text-[#fff] pl-1 [&>img]:mx-1 [&>img]:cursor-pointer ">

                    {
                        flag && 
                        images.map((element,index) => {
                            return <img key={index} src={"../src/assets/images/customizeZombie/backDrops/" + element + ".png"} alt="" data-color={element} className="w-[17.3px] brightness-[40%]" onClick={changeBackGroundColor} />
                        })
                        
                    }
                    {
                        !flag && 
                        "Color Cannot Be Applyed To This Item" 
                    }

                </div>
            </div>
        
    )
}

export default Backdrops