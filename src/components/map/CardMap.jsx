import { useState } from 'react';
import Card from '../Card'

const CardMap = ({ sunStorage }) => {
    const [data, setData] = useState(JSON.parse(sessionStorage.getItem("selectedPlants")))
    
    return (
        data?.map((element,index) => {
            return (
                <Card key={index} image={element.image} price={element.price} sunStorage={sunStorage} />
            )
        }) 
    )
}

export default CardMap