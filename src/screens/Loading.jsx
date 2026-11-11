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
            <div className="w-[300px] h-[50px] absolute bottom-[15px] right-[29%]">
                <img src="../src/assets/images/startGame/LoadBar_dirt.png" alt="" className="absolute bottom-0 z-[6]" />
                <div className="grass relative w-0 h-[50px] top-[-15px] right-[2px] z-10" />
            </div>
            <img src="../src/assets/images/startGame/LoadBar_circleGrass.png" alt="" className="moveSircleLoading absolute bottom-[53px] left-[31%] z-50" />
            {[
                ['LoadBar_zombieHead.png', 'right-[37%]'],
                ['LoadBar_flower.png', 'right-[47%] scale-y-[80%]'],
                ['LoadBar_flower.png', 'right-[54%] scale-x-[-1]'],
                ['LoadBar_flower.png', 'right-[61%] scale-[80%]'],
            ].map(([image, position]) => (
                <img key={position} src={`../src/assets/images/startGame/${image}`} alt=""
                    className={`absolute ${ready ? 'bottom-[55px] z-[55]' : 'bottom-[25px] z-[5]'} ${position}`}
                    style={{ transition: 'bottom 500ms ease, z-index 0s linear 250ms' }} />
            ))}
            <button type="button" onClick={start} disabled={!ready}
                className="absolute inset-0 z-[60] cursor-pointer text-[#d9b720] enabled:hover:text-[#f9590f] disabled:cursor-default">
                <span className="absolute inset-x-0 bottom-[28px] h-[25px] flex items-center justify-center pl-[25px] text-[22px]">
                    {ready ? 'CLICK TO START!' : 'LOADING...'}
                </span>
            </button>
        </>
    )
}

export default Loading
