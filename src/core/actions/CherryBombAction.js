
import changeSrcForCherryBomb from "../utils/changeSrcForCherryBomb.utils"

const CherryBombAction = (e,element) => {

    let leftPlantPlus = parseInt(e.target.parentNode.getAttribute("data-left")) + 10
    let leftPlantMinus = parseInt(e.target.parentNode.getAttribute("data-left")) - 20

    element.classList.add("scaling")

    setTimeout(async() => {

        element.classList.remove("scaling")
        if(zombieSpawn.children.length !== 0) {
            for(let i = 0 ; i < zombieSpawn.children.length ; i++) {
                if(e.target.getAttribute("data-row") == zombieSpawn.children[i].getAttribute("data-row") && leftPlantPlus >= parseInt(zombieSpawn.children[i].style.left) && leftPlantMinus <= parseInt(zombieSpawn.children[i].style.left) + 10) {
                    changeSrcForCherryBomb(e)
                    cherrybomb.play()
                    zombieSpawn.children[i].setAttribute("data-exist",false)
                    zombieSpawn.children[i].setAttribute("data-stop",true)
                    zombieSpawn.children[i].src = "../src/assets/images/zombies/burnedZombie.gif"
                }
                else {
                    cherrybomb.play()
                    changeSrcForCherryBomb(e)
                }
            }
        }
        else {
            cherrybomb.play()
            changeSrcForCherryBomb(e)
        }

    }, 2000);

}

export default CherryBombAction