import { tapClick } from "../sound/playSound.utils"
import customAxios from "../../services/interceptor/customAxios"

const restartLevels = async () => {
    const { data } = await customAxios.get("/ourPlants")

    data.map(async (element) => {
        if(element.id !== "1")  await customAxios.delete(`/ourPlants/${element.id}`)
    })

    customAxios.put("/level/1",{
        "id": 1,
        "level": 1
    })
    tapClick()
    restartModal.classList.replace("invisible" , "visible")
}

export default restartLevels