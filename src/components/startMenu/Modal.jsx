import { bleepHover } from "../../core/utils/sound/playSound.utils"

const Modal = ({id , src , onClick}) => {
    return (
        <div id={id} className="w-full h-full absolute left-0 top-0 flex justify-center items-center z-50 invisible">
            <img src={`../src/assets/images/${src}`} alt="" className="mb-[30px]" />
            <img src={`../src/assets/images/startMenu/big_ok_button.png`} alt="" className="absolute right-[26%] bottom-[32%] hover:brightness-125 cursor-pointer" onMouseOver={bleepHover} onClick={onClick} />
        </div>
    )
}

export default Modal