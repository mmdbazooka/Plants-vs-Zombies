import { errorSound } from "../sound/playSound.utils"

const getSrcCard = (e , sunStorage , price , setPicture , setpricePerPlant) => {
    if(sunStorage >= price) {
        selectSeed.play()


        for(let i = 0 ; i < seedBankHolder.children.length ; i++) seedBankHolder.children[i].classList.remove("brightness-75")
        e.target.parentNode.classList.add("brightness-75")

        setPicture(e.target.getAttribute("data-image"))
        setpricePerPlant(parseInt(e.target.getAttribute("data-price")))
        let slice = e.target.getAttribute("data-image").slice(0,e.target.getAttribute("data-image").indexOf("."))
        container.style.cursor = `url(../src/assets/images/plants/${slice}-cursor.png),auto`    
    }
    else { 
        for(let i = 0 ; i < seedBankHolder.children.length ; i++) seedBankHolder.children[i].classList.remove("brightness-75")
        setPicture()
        setpricePerPlant()
        errorSound()
        counterTextSun.classList.add("text-[red]")
        setTimeout(() => {
            counterTextSun.classList.remove("text-[red]")
        }, 300);
        container.style.cursor = "default"
    }

}

export default getSrcCard