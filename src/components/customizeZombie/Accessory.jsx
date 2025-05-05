import arr from "../../core/services/dataBase/accessory"


const Accessory = () => {

    const changeImage = (e,i) => {
        accessoryZombie.src = e.target.getAttribute("src")
        parentAccessoryZombie.style.right = arr[i].right + "%"
        parentAccessoryZombie.style.top = arr[i].top + "%"
    }

    return (
        <div className="w-[400px] h-[330px] absolute flex content-start flex-wrap [&>img]:mx-1 [&>img]:mb-[11px] [&>img]:bg-[#ccc] pl-[12px]  my-[15px] [&>img]:rounded-[15px] [&>img]:py-[15px] [&>img]:px-[14px] [&>img]:cursor-pointer ">

            {
              arr.map((element,index) => {
                return <img key={index} src={"../src/assets/images/customizeZombie/accessory/" + element.image + ".png"} alt="" className="w-[55px] h-[55px]" onClick={(e) => changeImage(e,index)} />
              })
            }

        </div>

    )
}

export default Accessory