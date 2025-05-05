import customAxios from "../../services/interceptor/customAxios"

const createArrayForOurPlants = async () => {

    const result = await customAxios.get("/ourPlants")
    result.data.map((el,index) => {
        console.log("FD");
        customAxios.put(`/ourPlants/${index+1}`,{
            "id" : el.id ,
            "image" : el.image , 
            "price" : el.price ,
            "isBrightness" : true
        })
    })
    
}

export default createArrayForOurPlants