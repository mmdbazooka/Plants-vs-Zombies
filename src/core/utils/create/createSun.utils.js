let intervalSun ; 

const createSun = (boolean , setSunStorage) => {
    let flag = false
    if(boolean) {
        intervalSun = setInterval(() => {

            let count = Math.floor(Math.random()*670+30)
            let height = Math.floor(Math.random()*440+100)
            let sun = document.createElement("img")
            sun.className = `sun w-[55px] h-[55px] transition-all duration-[5s] ease-linear hover:scale-[105%] absolute z-[1002] top-[0] rotateSun ` ;
            sun.src = "../src/assets/images/levels/sun.png"
            sun.style.left = count + "px"
            setTimeout(() => { sun.style.top = height + "px" }, 100);
            sun.addEventListener("click",(e)=> {
                if(!flag) {
                    flag = true
                    sun.style.transition = "1s"
                    sun.style.left = "33px"
                    sun.style.top = "8px"
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
            container.appendChild(sun)
            setTimeout(() => {
                sun.style.transition = "1s"
                sun.style.opacity = "0"
            }, 14000);
            setTimeout(() => { sun.remove() }, 15000);

        }, 9000);
    }
    else if(!boolean) {
        clearInterval(intervalSun)
    }
}

export default createSun