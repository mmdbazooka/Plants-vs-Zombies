const featuredNum = (imageZombie) => {

    let num = parseInt(imageZombie.style.top)
    if(num == -15) imageZombie.setAttribute("data-row",1)
    else if(num == 5) imageZombie.setAttribute("data-row",2)
    else if(num == 25) imageZombie.setAttribute("data-row",3)
    else if(num == 45) imageZombie.setAttribute("data-row",4)
    else if(num == 63) imageZombie.setAttribute("data-row",5)

}

export default featuredNum