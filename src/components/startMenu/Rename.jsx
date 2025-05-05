import { bleepHover } from "../../core/utils/sound/playSound.utils"
import { closeRename, closeUserName, newUser } from "../../core/utils/start/miniFunctionOfStartMenu.utils"
import renameSubmit from "../../core/utils/start/renameSubmit.utils"

const Rename = ({ userName , setUserName }) => {
    return (
        <div id="renameModalHolder" className="w-full h-full absolute left-0 top-0 flex justify-center items-center z-50 invisible">
            <div className="relative flex justify-center items-center">
                <img src="../src/assets/images/startMenu/who_are_you.png" alt="" />
                <img src="../src/assets/images/startMenu/cancel_button.png" alt="" className="w-[205px] h-[40px] absolute right-16 bottom-10 cursor-pointer hover:brightness-125" onClick={closeRename} onMouseOver={bleepHover} />
                <img src="../src/assets/images/startMenu/rename_button.png" alt="" className="w-[205px] h-[42px] absolute left-16 bottom-[38px] cursor-pointer hover:brightness-125" onClick={newUser} onMouseOver={bleepHover} />
                <div className="absolute top-[137px] text-[20px] text-[#fff]">{userName}</div>
                <div id="newUserHolder" className="absolute invisible ">
                    <img src="../src/assets/images/startMenu/rename.png" alt="" />

                    <input type="text" id="inputRenameUserName" className="w-[82%] absolute right-[9%] bottom-[39%] bg-[transparent] outline-none pl-[8px] text-white placeholder:text-white" />
                    <img src="../src/assets/images/startMenu/cancel_button.png" alt="" className="w-[205px] h-[40px] absolute right-9 bottom-6 cursor-pointer hover:brightness-125" onClick={closeUserName}onMouseOver={bleepHover} />
                    <img src="../src/assets/images/startMenu/ok-button.png" alt="" className="w-[205px] h-[40px] absolute left-8 bottom-6 cursor-pointer hover:brightness-125" onClick={() => renameSubmit(setUserName)}onMouseOver={bleepHover} />
                </div>
            </div>
        </div>
    )
}

export default Rename