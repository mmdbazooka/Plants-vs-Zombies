import customAxios from "../../services/interceptor/customAxios"

const getInfoCard = async (setCardSrc , setCardName , setCardDescription) => {
    const { data } = await customAxios.get("/level")
    
    if(data[0].level == 2) {
        setCardName("Sun Flower")
        setCardSrc("sunflower")
        setCardDescription("it gives you sun every 7 secend")
    }
    else if(data[0].level == 3) {
        setCardName("Wall Nut")
        setCardSrc("Wall-nut")
        setCardDescription("wall nut takes 16 seconds to eat nuts")
    }
    else if(data[0].level == 4) {
        setCardName("RePeater Shooter")
        setCardSrc("Repeatershooter")
        setCardDescription("it shot 2 pea frequently")
    }
    else if(data[0].level == 5) {
        setCardName("Cherry Bomb")
        setCardSrc("Cherry-Bomb")
        setCardDescription("it makes a explosion and can kill several zombies in 2 block front and back in row")
    }
    else if(data[0].level == 6) {
        setCardName("Snow PeaShooter")
        setCardSrc("snowPeashooter")
        setCardDescription("it shot frozen pea and can make freeze effect on zombie")
    }
}

export default getInfoCard