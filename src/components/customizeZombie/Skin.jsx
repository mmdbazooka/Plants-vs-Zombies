const Skin = () => {

    let skulls = ["859279","4e865d","7e865d","778131","9ba268","5f960a","92b74c","518e35","78a762","409b49","6ab171","677859"]

    const 
    changeZombieColor = (e) => {
        for(let i = 0; i < e.target.parentNode.children.length;i++) {
            e.target.parentNode.children[i].className = "deactive"
        }
        if(e.target.className == "deactive") e.target.className = "active"
        else return

        zombieImg.src = `../src/assets/images/customizeZombie/zombieColor/${e.target.getAttribute("data-color")}.png`
    }

    return (
        <>
            <img src="../src/assets/images/customizeZombie/tabs/skinTab.png" alt="" className="w-full h-full" />
            <img src="../src/assets/images/customizeZombie/tabs/colors_bg.png" alt="" className="absolute left-[68px] bottom-[26px]" />
            <div className="w-[237px] h-[55px] absolute left-[77px] bottom-[39px] flex flex-wrap items-center pl-1 [&>img]:mx-[2px] [&>img]:cursor-pointer [&>img.deactive]:grayscale-[100%] [&>img.deactive]:brightness-50">

                {
                    skulls.map((el,index) => {
                        return <img key={index} src={`../src/assets/images/customizeZombie/skulls/skull-${index + 1}-${el}.png`} alt="" className={index == 0 ? "active" : "deactive"} onClick={(e) => changeZombieColor(e)} data-color={el} />
                    })
                }

            </div>
        </>
    )
}

export default Skin