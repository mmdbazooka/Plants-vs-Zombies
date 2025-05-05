import { tapClick } from "../sound/playSound.utils"
import customAxios from "../../services/interceptor/customAxios"

const difficulty = async (e) => {
    tapClick()
    if(e.target.getAttribute("id") == "easy") {
        localStorage.setItem("difficulty" , "easy")
        customAxios.put("/ourPlants/2",{
            "id" : 2 ,
            "image" : "sunflower.png",
            "price" : 25,
            "isBrightness" : true
        })
    }
    else if(e.target.getAttribute("id") == "normal") {
        localStorage.setItem("difficulty" , "normal")
        customAxios.put("/ourPlants/2",{
            "id" : 2 ,
            "image" : "sunflower.png",
            "price" : 50,
            "isBrightness" : true
        })
    }
    else if(e.target.getAttribute("id") == "hard") {
        localStorage.setItem("difficulty" , "hard")
        customAxios.put("/ourPlants/2",{
            "id" : 2 ,
            "image" : "sunflower.png",
            "price" : 75,
            "isBrightness" : true
        })
    }
}

export default difficulty