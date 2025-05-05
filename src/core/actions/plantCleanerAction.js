const plantCleaner = (setPicture , setpricePerPlant) => {
    for(let i = 0 ; i < seedBankHolder.children.length ; i++) seedBankHolder.children[i].classList.remove("brightness-75")
    shovel.play()
    container.style.cursor = "url(../src/assets/images/plants/bil.png),auto"
    setPicture("bil")
    setpricePerPlant()
}

export default plantCleaner