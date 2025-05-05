
const ZombieShowMap = () => {


    let imageArray = ["Screenshot (78)","Screenshot (99)","Screenshot (99)","Screenshot (30)","Screenshot (30)"]
   

    return (

        imageArray.map((element,index) => {

            let randomSrc = Math.floor(Math.random()*5)

            return (
                <div key={index} className={`w-[80px] h-[150px] rotate-[15deg] absolute ${index == 4 ? "top-[8%] right-[27%]" : ""} ${index == 3 ? "bottom-[39%] left-6" : ""}  ${index == 2 ? "bottom-[15%]" : ""} ${index == 1 ? "right-[14%] top-[25%]" : ""} ${index == 0 ? "left-[15%] top-4" : ""} `} >
                    <img src={"../src/assets/images/zombies/" + imageArray[randomSrc] + ".png"} alt="" />
                </div>
            )

        })
        
    )
}

export default ZombieShowMap