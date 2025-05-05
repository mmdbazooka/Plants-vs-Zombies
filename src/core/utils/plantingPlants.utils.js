import CherryBombAction from "../actions/CherryBombAction"
import peaShooterAction from "../actions/peaShooterAction"
import createSunOfSunflower from "./create/createSunOfSunflower.utils"

const plantingPlant = (e , sunStorage , setSunStorage , picture , setPicture , pricePerPlant , setpricePerPlant) => {
    let element = e.target.previousElementSibling
    
    container.style.cursor = "default"
    if(sunStorage >= pricePerPlant && e.target.nodeName !== "IMG") {
        if(element.getAttribute("src") == "") {
            
            if(picture !== "") {
                element.src = "../src/assets/images/plants/" + picture 
                plant.play()
            }
            else element.src = ""
            
            if(element.getAttribute("src").indexOf("sunflower") !== -1) createSunOfSunflower(e , setSunStorage)
                else if(element.getAttribute("src").indexOf("shooter") !== -1) peaShooterAction(e,element)
            else if(element.getAttribute("src").indexOf("Cherry-Bomb") !== -1) CherryBombAction(e,element)
            localStorage.setItem("countSun",sunStorage - pricePerPlant)
            setSunStorage(localStorage.getItem("countSun"))
            setPicture("")
            setpricePerPlant(0)
        }
    }
    else if(picture == "bil") {
        Chomp8s.pause()
        Chomp16s.pause()
        if(element) element.src = ""
        setPicture("")
    }
    for(let i = 0 ; i < seedBankHolder.children.length ; i++) seedBankHolder.children[i].classList.remove("brightness-75")
}

export default plantingPlant
