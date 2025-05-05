const createSunOfSunflower = (e , setSunStorage) => {

    let element = e.target.previousElementSibling
    let flag = false

    
    if(element.getAttribute("src") !== "") {

        let int = setInterval(() => {

            if(element.getAttribute("src").indexOf("sunflower") !== -1) {
    
                let sun = document.createElement("img")
                sun.className = "sun w-[55px] h-[55px] transition-all duration-[5s] absolute ease-linear z-[1500] bottom-[0] right-[-10px] cursor-pointer " ;
                sun.src = "../src/assets/images/levels/sun.png"   
                e.target.appendChild(sun) 
                sun.addEventListener("click",(e)=> {
                    if(!flag) {
                        flag = true
                        sun.style.transition = "1s"
                        sun.style.zIndex = "1000"
                        sun.style.opacity = "0"
                        localStorage.setItem("countSun",parseInt(localStorage.getItem("countSun"))+25)
                        setSunStorage(parseInt(localStorage.getItem("countSun")))
                        points.play()
                        setTimeout(() => { 
                            e.target.remove()
                            flag = false
                         }, 1000);
                    }

                })
                clearInterval(int)
    
                setTimeout(() => { 
                    sun.remove()
                    createSunOfSunflower(e , setSunStorage)
                }, 4000);

            }
            else clearInterval(int)


        }, 7000);

    }
}


export default createSunOfSunflower