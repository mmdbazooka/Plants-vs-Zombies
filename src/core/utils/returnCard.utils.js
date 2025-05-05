import customAxios from "../services/interceptor/customAxios"
import { tapClick } from "./sound/playSound.utils"

const returnCard = async(element,setSelectedPlants,setPlantsThatWeHave) => {
    let array = JSON.parse(sessionStorage.getItem("flagPlantsThatWeHave"))
    let num = element.id-1
    array[num] = true
    sessionStorage.setItem("flagPlantsThatWeHave",JSON.stringify(array))


    let arr = JSON.parse(sessionStorage.getItem("selectedPlants"))
    let filtered = arr.filter((el) => {
        return el.id !== element.id
    })
    sessionStorage.setItem("selectedPlants",JSON.stringify(filtered))
    setSelectedPlants(JSON.parse(sessionStorage.getItem("selectedPlants")))
    await customAxios.put(`/ourPlants/${element.id}`,{
        "id" : element.id ,
        "image" : element.image , 
        "price" : element.price ,
        "isBrightness" : true
    })

    const result = await customAxios.get("/ourPlants")
    setPlantsThatWeHave(result.data)
    tapClick()
}


export default returnCard