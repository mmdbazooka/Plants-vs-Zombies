const handelZombieBurned = () => {
    let interval = setInterval(() => {

        if(location.pathname == "/level") {
            for(let i = 0 ; i < zombieSpawn.children.length ; i++) {
                if(zombieSpawn.children[i] && zombieSpawn.children[i].getAttribute("src").indexOf("burned") !== -1) {
                    zombieSpawn.children[i].remove()
                }
            }
        }
        else clearInterval(interval)

    }, 2000);
}

export default handelZombieBurned