import customAxios from "../../services/interceptor/customAxios"

const setPlant = async () => {
    const plants = await customAxios.get("/ourPlants")
    if(plants.data.length == 0) {
        customAxios.post("/ourPlants",{
            "id" : "1" ,
            "image" : "peashooter.png",
            "price" : 100,
            "isBrightness" : true
        })
    }
}

export default setPlant