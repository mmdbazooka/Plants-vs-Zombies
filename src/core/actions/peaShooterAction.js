import createPea from "../utils/create/createPea";

const peaShooterAction = (e,element) => {

    let int = setInterval(() => {
        
        if(location.pathname == "/level") {

            for(let i = 0 ; i < zombieSpawn.children.length ; i++) {
                if(e.target.getAttribute("data-row") == zombieSpawn.children[i].getAttribute("data-row")) {
                    if(element.getAttribute("src").indexOf("Repeatershooter") !== -1) {
                        createPea(e)
                        setTimeout(() => { createPea(e) }, 2000);
                    }
                    else createPea(e)
                }
            }

        }
        else clearInterval(int)

    }, 10000);
  
}



export default peaShooterAction