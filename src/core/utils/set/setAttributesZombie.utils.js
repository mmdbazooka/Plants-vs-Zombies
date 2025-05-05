let andis = 0 ;

const setAttributesZombie = async (imageZombie,arrayZombie,randomImage,arrayZombieTop,randomZombieTop,bool) => {

    imageZombie.src = "../src/assets/images/zombies/" + arrayZombie[randomImage] + ".gif"

    let zombieVoices = [groan1,groan2,groan3,groan4,groan5,groan6]
    let randomNum = Math.floor(Math.random()*6)
    zombieVoices[randomNum].play()

    imageZombie.className = `w-[80px] translate-y-[30px] absolute z-[98] left-full transition-all duration-500 ${bool ? "lastZombie" : ""}`;

    imageZombie.setAttribute("data-index",andis++)
    imageZombie.setAttribute("data-stop",false)
    imageZombie.setAttribute("data-exist",true)
    imageZombie.setAttribute("data-left",100)
    if(imageZombie.getAttribute("src") == "../src/assets/images/zombies/ConeHead_Zombie.gif") imageZombie.setAttribute("data-hp",2)
    else if(imageZombie.getAttribute("src") == "../src/assets/images/zombies/Buckethead_Zombie.gif") imageZombie.setAttribute("data-hp",3)
    else imageZombie.setAttribute("data-hp",1)
    
    imageZombie.style.top = `${arrayZombieTop[randomZombieTop]}%`

}


export default setAttributesZombie