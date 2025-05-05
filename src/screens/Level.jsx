import { useContext, useEffect } from "react"
import createSun from "../core/utils/create/createSun.utils";
import PlantingBlockMap from "../components/map/PlantingBlockMap";
import CardMap from "../components/map/CardMap";
import ZombieShowMap from "../components/map/ZombieShowMap";
import zombie from "../core/utils/zombie.utils";
import { useNavigate } from "react-router-dom";
import plantCleaner from "../core/actions/plantCleanerAction";
import handelZombieBurned from "../core/utils/handelZombieBurned.utils";
import { context } from "../context/appContext";

const Level = () => {

    const { sunStorage , setSunStorage , setPicture , setpricePerPlant } = useContext(context)
    const navigate = useNavigate()

    useEffect(() => {
        createSun(true , setSunStorage)
        zombie(navigate , setSunStorage)
        handelZombieBurned()
        localStorage.setItem("countSun",50)
        setTimeout(() => { gallery.style.left = "-74%" }, 1000);
        setTimeout(() => { gallery.style.left = "-27%" }, 3000);
        setTimeout(() => { 
            SeedBank.classList.replace("invisible","visible") 
            SeedBank.classList.replace("top-[-100%]","top-0") 
        }, 3000);
        setTimeout(() => {
            mainmusic.play()
            selectPlantsMusic.pause()
        }, 100);
        return () => {
            createSun(false , setSunStorage)
            let sun = document.querySelectorAll(".sun")
            sun.forEach(element => element.remove())
            mainmusic.pause()
        }
    }, [])

    const stopGame = () => {
        pauseSound.play()
        navigate("/start-menu") 
    }
    
    return (
        <>
            <div id="gallery" className="w-[1400px] h-full transition-all duration-1000 ease-in-out flex relative left-[0%]" >
                <img src="../src/assets/images/levels/background3.png" alt="" />
                <img src="../src/assets/images/levels/background1.png" alt="" />
                <img src="../src/assets/images/levels/background2.png" alt="" />
                <div id="SeedBank" className="z-[1003] transition-all duration-1000 ease-linear absolute left-[17%] top-[-100%] invisible" >
                    <div className="w-[70px] h-[70px] rounded-[15px] flex justify-center items-center cursor-pointer absolute right-[-70px] bg-[#fff]" onClick={() => plantCleaner(setPicture , setpricePerPlant)}>
                        <img src="../src/assets/images/plants/bilPlace.png" alt="" />
                    </div>
                    <div className="w-[170px] h-[30px] rounded-[15px] flex justify-center items-center cursor-pointer absolute right-[-320px] hover:brightness-125" onClick={stopGame}>
                        <img src="../src/assets/images/levels/mainMenu.png" className="w-full h-full" alt="" />
                    </div>
                    <img src="../src/assets/images/levels/SeedBank.png" alt="" className="w-[450px]" />
                    <div id="seedBankHolder" className="w-[360px] h-[70px] absolute left-[17.5%] top-[8px] flex [&>*]:mx-[3px]">
                        <CardMap sunStorage={sunStorage} />
                    </div>
                    <span id="counterTextSun" className="absolute left-[14px] bottom-[5px] w-[53px] h-[20px] flex justify-center items-center ">{ sunStorage }</span>
                </div>
                <div id="loseGameHolder" className="h-full w-full fixed left-0 top-0 flex flex-col justify-center items-center z-[9997] bg-[#0000008b] invisible">
                    <img src="../src/assets/images/levels/gameOver.png" alt="" />
                    <img src="../src/assets/images/levels/tryAgain_button.png" alt="" className="relative top-[-63px] left-[-3px] cursor-pointer hover:brightness-125" onClick={()=> navigate("/select-plants")}/>
                </div>
                <div id="zombieSpawn" className="w-[800px] h-[81%] absolute top-[14%] left-[17.5%]"></div>
                <div id="peaSpawn" className="w-[800px] h-[81%] absolute top-[14%] left-[17.5%]"></div>
                <div id="parentBlockPlants" className="w-[740px] h-[81%] absolute top-[14%] left-[17.5%] flex flex-wrap content-start [&>div]:w-[82px] [&>div]:h-[97px] [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:relative" >
                    <PlantingBlockMap />
                </div>
                <div dir="rtl" className="clipPass flex justify-center items-center w-[23%] h-[600px] absolute right-[2%] top-[5%] z-10 rotate-[-15deg]" ><ZombieShowMap /></div>
            </div>
        </>
    )
}

export default Level