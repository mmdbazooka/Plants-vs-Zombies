import { Fragment } from 'react'
import { difficultySettings, getDifficulty } from '../../core/utils/difficulty'
import { bleepHover, tapClick } from '../../core/utils/sound/playSound.utils'

const Difficulty = () => (
    <div role="group" aria-label="Difficulty" className="difficulty w-[260px] flex justify-around items-center absolute bottom-44 [&>label]:w-[34px] [&>label]:h-[30px] [&>label]:scale-90 [&>label]:cursor-pointer [&>label:hover]:brightness-125">
        {Object.keys(difficultySettings).map(mode => (
            <Fragment key={mode}>
                <input type="radio" name="difficulty" id={mode} aria-label={mode}
                    className="sr-only peer" defaultChecked={getDifficulty() === mode}
                    onChange={() => { localStorage.setItem('difficulty', mode); tapClick() }} />
                <label htmlFor={mode} onMouseEnter={bleepHover} />
            </Fragment>
        ))}
    </div>
)

export default Difficulty
