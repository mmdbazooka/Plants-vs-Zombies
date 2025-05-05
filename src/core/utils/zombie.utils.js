import createCard from "./create/createCard.utils";
import customAxios from "../services/interceptor/customAxios";
import featuredNum from "./featuredNum.utils";
import setAttributesZombie from "./set/setAttributesZombie.utils";

const zombie = async (navigate , setSunStorage) => {

    let arrayZombie = ["Zombie","Buckethead_Zombie","ConeHead_Zombie"]
    let arrayZombieTop = [-15,5,25,45,63]
    let numZombie = 0 ;
    let flag = true ;
    let countZombie ;

    let { data } = await customAxios.get("/level")
    if(data[0].level == 1) countZombie = 0
    else if(data[0].level == 2) countZombie = 1
    else if(data[0].level == 3) countZombie = 3
    else if(data[0].level == 4) countZombie = 5
    else if(data[0].level == 5) countZombie = 8
    else if(data[0].level == 6) countZombie = 11

    const changeZombieEatToWalk = (imageZombie) => {

        if(imageZombie.getAttribute("src").indexOf("eatHalab") !== -1) {
            imageZombie.setAttribute("src","../src/assets/images/zombies/Buckethead_Zombie.gif")
        }
        else if(imageZombie.getAttribute("src").indexOf("eatzombie") !== -1) {
            imageZombie.setAttribute("src","../src/assets/images/zombies/Zombie.gif")
        }
        else if(imageZombie.getAttribute("src").indexOf("eatkolah") !== -1) {
            imageZombie.setAttribute("src","../src/assets/images/zombies/ConeHead_Zombie.gif")
        }

    }

    const changeZombieWalkToEat = (imageZombie) => {

        if(imageZombie.getAttribute("src").indexOf("Buckethead_Zombie") !== -1) {
            imageZombie.setAttribute("src","../src/assets/images/zombies/eatHalab.gif")
        }
        else if(imageZombie.getAttribute("src").indexOf("ConeHead_Zombie") !== -1) {
            imageZombie.setAttribute("src","../src/assets/images/zombies/eatkolah.gif")
        }
        else if(imageZombie.getAttribute("src").indexOf("Zombie") !== -1) {
            imageZombie.setAttribute("src","../src/assets/images/zombies/eatzombie.gif")
        }

    }

    const createZombie = (bool,setSunStorage) => {

        flag = true
        
        let randomImage = Math.floor(Math.random()*3)
        let randomZombieTop = Math.floor(Math.random()*5)

        let imageZombie = document.createElement("img")

        setAttributesZombie(imageZombie,arrayZombie,randomImage,arrayZombieTop,randomZombieTop,bool)
        featuredNum(imageZombie)
        
        if(imageZombie.className.indexOf("lastZombie") !== -1) {
            let int = setInterval(() => {
                if(location.pathname == "/level") {
                    if(zombieSpawn.children.length == 0) {
                        createCard(navigate , setSunStorage)
                        clearInterval(int)
                    }
                }
                else clearInterval(int)
            }, 500);
        }

        
        let int1 = setInterval(() => {
            if(location.pathname == "/level") {
                for(let i = 0 ; i < parentBlockPlants.children.length ; i++) {
                    if(parentBlockPlants.children[i].getAttribute("data-top") == parseInt(imageZombie.style.top)) {
                        if(parentBlockPlants.children[i].getAttribute("data-left") == parseInt(imageZombie.style.left)) {
                            if(parentBlockPlants.children[i].firstChild.getAttribute("src") !== ""){
                                if(imageZombie.getAttribute("data-exist") == "true") {

                                    imageZombie.setAttribute("data-stop",true)
                                    Chomp8s.play()
                                    changeZombieWalkToEat(imageZombie)
    
                                }
                                else if (imageZombie.getAttribute("data-exist") !== "true") {
                                    Chomp8s.pause()
                                    Chomp16s.pause()
                                }
    
                                
                                setTimeout(() => {
                                    if(imageZombie.getAttribute("data-exist") == "true") {
                                        
                                        changeZombieEatToWalk(imageZombie)
                                        
                                        if(imageZombie.getAttribute("data-exist") == "true") parentBlockPlants.children[i].firstChild.setAttribute("src","")
                                        imageZombie.setAttribute("data-stop",false) 
    
                                    }
                                }, parentBlockPlants.children[i].firstChild.getAttribute("src") == "../src/assets/images/plants/Wall-nut.png" ? 16000 : 8000);
                            }
                            else { 
                                changeZombieEatToWalk(imageZombie)
                                imageZombie.setAttribute("data-stop",false)
                            }
                        }
                    }
                }
                if(imageZombie.getAttribute("data-stop") == "false" && imageZombie.getAttribute("data-exist") == "true") {
                    imageZombie.setAttribute("data-left",imageZombie.getAttribute("data-left") - 0.5) 
                    imageZombie.style.left = imageZombie.getAttribute("data-left") + "%"
                }

            }
            else clearInterval(int1)
        }, 350);

        let int2 = setInterval(() => {
            if(location.pathname == "/level"){
                for(let i = 0 ; i < zombieSpawn.children.length ; i++) {
                    if(zombieSpawn.children[i].getAttribute("data-left") < -9) {
                        losemusic.play()
                        gallery.style.left = 0
                        zombieSpawn.children[i].style.top = "34%";
                        if(zombieSpawn.children[i].getAttribute("data-left") < -15) zombieSpawn.children[i].className = "hidden"
                        setTimeout(() => {
                            loseGameHolder.classList.replace("invisible" , "visible")
                        }, 4000);
                    }
                }
            }
            else clearInterval(int2)
        }, 1000);
        
        zombieSpawn.appendChild(imageZombie)


    }

    const splitZombie = (setSunStorage) => {
        if(numZombie >= countZombie) {
            createZombie(true,setSunStorage)
            clearInterval(interval)
        }
        else {
            createZombie(false,setSunStorage)
            numZombie++
        }
    }

    var interval = setInterval(() => {

        if(location.pathname == "/level") splitZombie(setSunStorage)
        else clearInterval(interval)

    }, 11000);


}

export default zombie