import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { tapClick } from '../core/utils/sound/playSound.utils'

const Loading = () => {
    const navigate = useNavigate()
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 5000)
        return () => clearTimeout(timer)
    }, [])

    const start = () => {
        tapClick()
        navigate('/start-menu')
    }

    return (
        <>
            <img src="../src/assets/images/startGame/titlescreen.jpg" alt="" />
            <img src="../src/assets/images/startGame/textTitleScreen.png" alt="" className="absolute top-0" />
            <div className="w-[300px] h-[50px] absolute bottom-[15%] right-[29%]">
                <img src="../src/assets/images/startGame/LoadBar_dirt.png" alt="" className="absolute bottom-0 z-[6]" />
                <div className="grass relative h-[50px] top-[-15px] right-[2px] z-10" />
            </div>
            <img src="../src/assets/images/startGame/LoadBar_circleGrass.png" alt="" className="moveSircleLoading absolute bottom-[53px] left-[31%] z-40" />
            {[
                ['LoadBar_zombieHead.png', 'right-[37%]'],
                ['LoadBar_flower.png', 'right-[47%] scale-y-[80%]'],
                ['LoadBar_flower.png', 'right-[54%] scale-x-[-1]'],
                ['LoadBar_flower.png', 'right-[61%] scale-[80%]'],
            ].map(([image, position]) => (
                <img key={position} src={`../src/assets/images/startGame/${image}`} alt=""
                    className={`absolute z-[5] transition-all duration-500 ${ready ? 'bottom-[55px]' : 'bottom-[25px]'} ${position}`} />
            ))}
            {ready ? (
                <button type="button" onClick={start} className="absolute inset-0 z-50 cursor-pointer text-[#d9b720] hover:text-[#f9590f]">
                    <span className="absolute inset-x-0 bottom-[28px] text-[22px]">CLICK TO START!</span>
                </button>
            ) : <span className="absolute inset-x-0 bottom-[28px] z-10 text-center text-[22px] text-[#d9b720]">LOADING...</span>}
        </>
    )
}

export default Loading
