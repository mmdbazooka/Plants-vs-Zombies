import difficulty from '../../core/utils/start/difficulty.utils'
import { bleepHover } from '../../core/utils/sound/playSound.utils'

const Checkbox = ({ id }) => {
    return (
        <>
            <input type="radio" name="difficulty" id={id} defaultChecked={localStorage.getItem("difficulty") == id ? true : false} className="hidden" onInput={difficulty}/>
            <label htmlFor={id} onMouseOver={bleepHover}></label>
        </>
  )
}

export default Checkbox