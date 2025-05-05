import { errorSound } from "../sound/playSound.utils"
import customAxios from "../../services/interceptor/customAxios"

const startGame = async (navigate) => {
    const { data } = await customAxios.get("/level")
    if(data[0].level == 7) {
        finishModal.classList.replace("invisible" , "visible")
        errorSound()
    }
    else {
        startAdventure.play()
        losemusic.play()
        startmusic.pause()
        zombieHandPlace.classList.replace("opacity-0" , "opacity-1")
        zombieHand.classList.replace("bottom-[-45%]" , "bottom-[8%]")
        setTimeout(() => {
            navigate("/select-plants")
        }, 3000);
    }
}

export default startGame