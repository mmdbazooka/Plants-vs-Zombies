import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import customAxios from '../../core/services/interceptor/customAxios'


const Audio = () => {
  const location = useLocation()
  const [sounds, setSounds] = useState([])
  const [bool, setBool] = useState(null)

  useEffect(() => {
    get()
    check()
  }, [])

  const get = async () => {
    const { data } = await customAxios.get("/sounds")
    setSounds(data)
  }

  const check = () => {
    if(location.pathname == "/select-plants" || location.pathname == "/level" || location.pathname == "/details-card") setBool(false)
    else setBool(true)
  }
  return (
    <div className="hidden">
        {
            sounds?.map((audio,index) => {
                return (
                    <audio key={index} id={audio.name} src={`../src/assets/audio/${audio.name}.mp3`} loop={audio.loop == true ? true : false} autoPlay={bool ? audio.name == "startmusic" ? true : false : false}></audio>
                )
            })
        }
    </div>
  )
}

export default Audio