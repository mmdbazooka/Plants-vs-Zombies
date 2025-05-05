import { errorSound } from "../sound/playSound.utils"

const SubmitUserName = async (setUserName , setModalUserName , setBrightness) => {
    if(inputUserName.value.length >= 4 && inputUserName.value.length <= 15) {
        setUserName(inputUserName.value)
        setModalUserName(false)
        setBrightness("light")
        localStorage.setItem("userName",inputUserName.value)
    }
    else if(inputUserName.value.length <= 4) {
        lessModal.classList.replace("invisible" , "visible")
        errorSound()
    }
    else {
        moreModal.classList.replace("invisible" , "visible")
        errorSound()
    }
}

export default SubmitUserName