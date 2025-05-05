import { useNavigate } from "react-router-dom"


const NotFound = () => {

    let navigate = useNavigate()

    return (
    <div className="h-[600px] flex justify-center items-center text-[25px] bg-black">
        <div className="bg-white rounded-xl py-2 px-5 cursor-pointer hover:scale-105 hover:-translate-y-4 transition-all duration-300" onClick={()=> navigate("/")}>
            Relaunch The Game
        </div>
    </div>
  )
}

export default NotFound