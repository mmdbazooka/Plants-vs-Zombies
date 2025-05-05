import { createContext, useState } from "react"

export const context = createContext()

const AppContext = ({ children }) => {

    const [flag, setflag] = useState(false)
    const [cardSrc, setCardSrc] = useState()
    const [cardName, setCardName] = useState()
    const [cardDescription, setCardDescription] = useState()
    const [sunStorage, setSunStorage] = useState(50)
    const [picture, setPicture] = useState("")
    const [pricePerPlant, setpricePerPlant] = useState()
    const [timeTostart, setTimeTostart] = useState(false)
    const [plantsThatWeHave, setPlantsThatWeHave] = useState([])
    const [selectedPlants, setSelectedPlants] = useState()
    
    return (
        <context.Provider value={{ setflag , flag , setCardSrc , cardSrc , setCardName , cardName , setCardDescription , cardDescription , sunStorage , setSunStorage , picture , setPicture , pricePerPlant , setpricePerPlant , timeTostart , setTimeTostart , plantsThatWeHave ,  setPlantsThatWeHave , selectedPlants , setSelectedPlants }}>
            { children }
        </context.Provider>
    )
}

export default AppContext