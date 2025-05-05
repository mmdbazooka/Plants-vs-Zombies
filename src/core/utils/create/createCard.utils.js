import createArrayForOurPlants from "./createArrayForOurPlants.utils"
import createSun from "./createSun.utils"
import customAxios from "../../services/interceptor/customAxios"

const createCard = async (navigate , setSunStorage) => {
    const { data } = await customAxios.get("/level")
    let priceSunFlower;

    let div = document.createElement("div")
    div.className = "card w-[60px] h-[70px] cursor-pointer absolute z-[1] top-[40%] left-[40%] z-[5000]"

    peaSpawn.appendChild(div)

    div.addEventListener("click", async () => {

        createArrayForOurPlants()

        const result = await customAxios.get("/level")

        await customAxios.put("/level/1",{
            "level": result.data[0].level + 1
        })
        const { data } = await customAxios.get("/level")

        if(data[0].level == 2) {
            customAxios.post("/ourPlants",{
                "id" : "2" ,
                "image" : "sunflower.png",
                "price" : priceSunFlower,
                "isBrightness" : true
            })
        }
        else if(data[0].level == 3) {
            customAxios.post("/ourPlants",{
                "id" : "3" ,
                "image" : "Wall-nut.png",
                "price" : 50,
                "isBrightness" : true
            })
        }
        else if(data[0].level == 4) {
            customAxios.post("/ourPlants",{
                "id" : "4" ,
                "image" : "Repeatershooter.png",
                "price" : 200,
                "isBrightness" : true
            })
        }
        else if(data[0].level == 5) {
            customAxios.post("/ourPlants",{
                "id" : "5" ,
                "image" : "Cherry-Bomb.png",
                "price" : 175,
                "isBrightness" : true
            })
        }
        else if(data[0].level == 6) {
            customAxios.post("/ourPlants",{
                "id" : "6" ,
                "image" : "snowPeashooter.png",
                "price" : 150,
                "isBrightness" : true
            })
        }
        else if(data[0].level == 7) {
            customAxios.post("/ourPlants",{
                "id" : "7" ,
                "image" : "medal.png", 
                "price" : 0,
                "isBrightness" : true
            })
        }
        
        winmusic.play()
        mainmusic.pause()
        
        div.className += " scaling"
        container.style.cursor = "default"
        if(data[0].level == 7) setTimeout(() => {navigate("/start-menu")}, 5000);
        else setTimeout(() => {navigate("/details-card")}, 5000);
    })


    if(data[0].level < 2) {
        if(localStorage.getItem("difficulty") == "easy") priceSunFlower = 25
        else if(localStorage.getItem("difficulty") == "normal") priceSunFlower = 50
        else if(localStorage.getItem("difficulty") == "hard") priceSunFlower = 75
    }


    let img = document.createElement("img")
    if(data[0].level == 1) img.src = "../src/assets/images/plants/sunflower.png"
    else if(data[0].level == 2) img.src = "../src/assets/images/plants/Wall-nut.png"
    else if(data[0].level == 3) img.src = "../src/assets/images/plants/Repeatershooter.png"
    else if(data[0].level == 4) img.src = "../src/assets/images/plants/Cherry-Bomb.png"
    else if(data[0].level == 5) img.src = "../src/assets/images/plants/snowPeashooter.png"
    else if(data[0].level == 6) img.src = "../src/assets/images/plants/medal.png"
    img.className = "w-[40px] h-[40px] absolute top-[10px] left-[7px]"
    div.appendChild(img)

    let span = document.createElement("span")
    let plantPrice = [0,priceSunFlower,50,200,150,150,"medal"]
    span.innerHTML = plantPrice[data[0].level]
    
    span.className = "absolute bottom-[-1px] left-[18px] text-[13px]"
    div.appendChild(span)
    createSun(false , setSunStorage)
}
 export default createCard