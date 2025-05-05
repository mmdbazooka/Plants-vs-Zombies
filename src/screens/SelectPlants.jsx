import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { bleepHover, tapClick } from "../core/utils/sound/playSound.utils"
import createArrayForOurPlants from '../core/utils/create/createArrayForOurPlants.utils'
import SelectPlantMap from '../components/map/selectPlantMap'
import Modal from '../components/startMenu/Modal'
import { useContext } from 'react'
import { context } from '../context/appContext'


const SelectPlants = () => {



    const { plantsThatWeHave , selectedPlants , setSelectedPlants } = useContext(context)


    let navigate = useNavigate()

    useEffect(() => { 

        
        createArrayForOurPlants()
        sessionStorage.setItem("selectedPlants",JSON.stringify([])) 
        setSelectedPlants([])
        setTimeout(() => {
            selectPlantsMusic.play()
        }, 300);

    }, [])

    const letsRock = () => {
        tapClick()
        if(JSON.parse(sessionStorage.getItem("selectedPlants")).length == (availablePlants.children.length > 6 ? 6 : availablePlants.children.length)) {
            navigate("/level") 
        } 
        else lowCardModal.classList.replace("invisible" , "visible")
    }

    const closeLowModal = () => {
        lowCardModal.classList.replace("visible" , "invisible")
        tapClick()
    }

    const backToMenu = () => {
        navigate("/start-menu")
        tapClick()
    }

    return (
        <>
            <img src="../src/assets/images/levels/background1.png" alt="" />
            <div className='w-full h-full absolute left-0 top-0 flex justify-center'>
                <div className='w-[70%] h-[100%] flex justify-center relative'>
                    <span className='absolute top-[10%] left-[14%]'>50</span>
                    <img src="../src/assets/images/selectPlants/selectorPage.png" alt=""  />
                    <img src="../src/assets/images/selectPlants/letsRock.png" className="w-[155px] h-[35px] absolute left-[36.5%] bottom-[22px] cursor-pointer" onMouseEnter={(e)=> e.target.src = "../src/assets/images/selectPlants/letsRockLight.png"} onMouseOut={(e)=> e.target.src = "../src/assets/images/selectPlants/letsRock.png"} onClick={letsRock} onMouseOver={bleepHover} alt="" />
                    <img src="../src/assets/images/selectPlants/close.png" className="absolute right-[12%] bottom-[22px] cursor-pointer hover:brightness-125" onClick={backToMenu} onMouseOver={bleepHover} alt="" />
                    <div id='availablePlants' className='w-[430px] h-[365px] absolute rounded-[15px] left-[11.5%] top-[21%] bg-[#4b200c] flex flex-wrap content-start [&>*]:mx-[2px]' >
                        
                        <SelectPlantMap arr={plantsThatWeHave} bool={true} />
                        
                    </div>
                </div>
                <div className='w-[46%] h-[70px] absolute left-[30%] top-2 flex [&>*]:mx-[2px]'>
                    
                    <SelectPlantMap arr={selectedPlants} bool={false} />
                    
                </div>
            </div>
            <Modal id="lowCardModal" src="selectPlants/selectMorePlants.png" onClick={closeLowModal} />
        </>
    )
}

export default SelectPlants