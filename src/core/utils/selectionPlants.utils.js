import customAxios from "../services/interceptor/customAxios"
import { tapClick } from "./sound/playSound.utils"

const selectionPlants = async (e,el,index,setSelectedPlants,setPlantsThatWeHave) => {  
    if(JSON.parse(sessionStorage.getItem("selectedPlants")).length <= 5){

        let arr = JSON.parse(sessionStorage.getItem("flagPlantsThatWeHave"))
        
        arr[index] = false
        sessionStorage.setItem("flagPlantsThatWeHave",JSON.stringify(arr))

        await customAxios.put(`/ourPlants/${el.id}`,{
            "id" : el.id ,
            "image" : el.image , 
            "price" : el.price ,
            "isBrightness" : false
        })
        
        const result = await customAxios.get("/ourPlants")
        setPlantsThatWeHave(result.data)
        
        if(sessionStorage.getItem("selectedPlants") == "") {
            let arr = []
            arr.push({id : index+1 , image : el.image , price: el.price})
            sessionStorage.setItem("selectedPlants",JSON.stringify(arr))    
            setSelectedPlants(JSON.parse(sessionStorage.getItem(("selectedPlants")))) 
            tapClick()
        }
        else {
            let arr = JSON.parse(sessionStorage.getItem(("selectedPlants")))
            let found = arr.findIndex((element) => {
                return element.id == index+1
            })
            if(found == -1) {
                arr.push({id : index+1 , image : el.image , price: el.price})
                sessionStorage.setItem("selectedPlants",JSON.stringify(arr))
                setSelectedPlants(JSON.parse(sessionStorage.getItem(("selectedPlants"))))
                tapClick()
            }
        }
    }
}

export default selectionPlants