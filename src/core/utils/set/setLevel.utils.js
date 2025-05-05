import customAxios from "../../services/interceptor/customAxios"

const setLevel = async () => {
    
    const result = await customAxios.get("/level")
    if(result.data.length == 0) customAxios.post("/level",{
        "id" : "1" ,
        "level" : 1
    })
    
}


export default setLevel