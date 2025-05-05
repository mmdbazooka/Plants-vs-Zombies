const createPea = (e) => {
    if(location.pathname == "/level") {
        if(peaSpawn.children.length <= 10) {
            if(e.target.previousElementSibling.getAttribute("src").indexOf("shooter") !== -1) {
            
                let sircle = document.createElement("img")
                if(e.target.previousElementSibling.getAttribute("src").indexOf("peashooter") !== -1 || e.target.previousElementSibling.getAttribute("src").indexOf("Repeatershooter") !== -1) sircle.src = "../src/assets/images/plants/pea.png" 
                else if(e.target.previousElementSibling.getAttribute("src").indexOf("snowPeashooter") !== -1) sircle.src = "../src/assets/images/plants/SnowPea.png" 
                  
                sircle.className = "pea z-[1000] transition-all duration-[3s] ease-linear absolute rotateSun " ;
                sircle.style.top = e.target.getAttribute("data-top") + "%"
                sircle.style.left = e.target.getAttribute("data-left") + "%"
                peaSpawn.appendChild(sircle) 
                throwpea.play()
        
                let left = parseInt(e.target.getAttribute("data-left"))
        
                let interval = setInterval(() => { 
                    left = left + 1
                    sircle.style.left = left + "%" 
                }, 200);
        
        
                let int = setInterval(() => {
    
                    if(location.pathname == "/level") {
                        for(let i = 0 ; i < zombieSpawn.children.length ; i++) {
        
                            if(parseInt(e.target.getAttribute("data-row")) == parseInt(zombieSpawn.children[i].getAttribute("data-row")) && zombieSpawn.children[i] && parseInt(sircle.style.left)-15 >= parseInt(zombieSpawn.children[i].style.left)) {
            
                                if(zombieSpawn.children[i].getAttribute("data-hp") == 1) {
                                    zombieSpawn.children[i].setAttribute("data-exist",false)
                                    setTimeout(() => {
                                        zombieSpawn.children[i].setAttribute("data-exist" , false)
                                        zombieSpawn.children[i].remove()
                                    }, 401);
                                }
            
                                if(zombieSpawn.children[i]) { 
                                    zombieSpawn.children[i].setAttribute("data-hp",zombieSpawn.children[i].getAttribute("data-hp") - 1)
                                    zombieSpawn.children[i].style.filter = "brightness(150%)"
                                    setTimeout(() => {
                                        if(zombieSpawn.children[i]) zombieSpawn.children[i].style.filter = "brightness(100%)"
                                    }, 500);
                                    if(e.target.previousElementSibling.getAttribute("src").indexOf("snowPeashooter") !== -1) zombieSpawn.children[i].style.filter = "drop-shadow(0 0 7px blue)"
                                }
                                sircle.remove()
            
                                
                                splat.play()
                                if(e.target.previousElementSibling.getAttribute("src").indexOf("snowPeashooter") !== -1) frozen.play()
                                clearInterval(int)
            
                            }
        
                        }
                    }
                    else clearInterval(int)
    
                }, 50);
                
        
            }
        
        }
    }
}

export default createPea