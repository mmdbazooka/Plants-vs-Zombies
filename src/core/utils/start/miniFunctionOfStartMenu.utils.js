import { tapClick } from "../sound/playSound.utils"

const renameModal = () => {
    tapClick()
    renameModalHolder.classList.replace("invisible" , "visible")
}

const closeRename = () => {
    tapClick()
    renameModalHolder.classList.replace("visible" , "invisible")
}

const newUser = () => {
    tapClick()
    newUserHolder.classList.replace("invisible" , "visible")
}

const closeUserName = () => {
    tapClick()
    newUserHolder.classList.replace("visible" , "invisible")
}

const helpPageOpen = (navigate) => { navigate("/help") }
    
const optionPageOpen = () => {
    tapClick()
    optionModalHolder.classList.replace("invisible" , "visible")
}

const optionPageClose = () => {
    tapClick()
    optionModalHolder.classList.replace("visible" , "invisible")
}

const quitPageOpen = () => {
    tapClick()
    quitModalHolder.classList.replace("invisible" , "visible")
}

const quitPageClose = () => {
    tapClick()
    quitModalHolder.classList.replace("visible" , "invisible")
}

const chnageBrightness = (e) => {
    container.style.filter = `brightness(${e.target.value}%)`
    localStorage.setItem("brightness",e.target.value)
}
const closeFinish = () => {
    finishModal.classList.replace("visible" , "invisible")
    tapClick()
}

const closeRestart = () => {
    restartModal.classList.replace("visible" , "invisible")
    tapClick()
}

const closeMore = () => {
    moreModal.classList.replace("visible" , "invisible")
    tapClick()
}

const closeLess = () => {
    lessModal.classList.replace("visible" , "invisible")
    tapClick()
}

export { renameModal , closeRename , newUser , helpPageOpen , closeLess , closeMore , closeRestart , closeFinish , chnageBrightness , quitPageClose , quitPageOpen , optionPageClose , optionPageOpen , closeUserName }
