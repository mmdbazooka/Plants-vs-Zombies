import { createContext, useState } from "react"

export const context = createContext()

const AppContext = ({ children }) => {

    const [flag, setflag] = useState(false)
    const [cardSrc, setCardSrc] = useState()
    const [cardName, setCardName] = useState()
    const [cardDescription, setCardDescription] = useState()
    
    return (
        <context.Provider value={{ setflag , flag , setCardSrc , cardSrc , setCardName , cardName , setCardDescription , cardDescription }}>
            { children }
        </context.Provider>
    )
}

export default AppContext