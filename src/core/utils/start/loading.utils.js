const loadingShow = () => {

    let ides = [zombieHead , flower1 , flower2 , flower3]
    setTimeout(() => {
        textLoading.innerHTML = "CLICK TO START!"
        loadBarDirt.className += "cursor-pointer"
        container.className += "cursor-pointer"
        ides.forEach(element => element.classList.replace("bottom-[25px]","bottom-[55px]"))
        setTimeout(() => { 
            ides.forEach(element => element.classList.replace("z-[5]","z-[55]"))
        }, 250);
    }, 5000);

}

export default loadingShow