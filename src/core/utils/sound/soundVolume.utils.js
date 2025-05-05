import customAxios from "../../services/interceptor/customAxios";

const soundVolume = async (type) => {
    const { data } = await customAxios.get("/sounds")
    const sound = data.filter(el => el.type == type)
    setTimeout(() => {
        sound.map(el => {
            let element = document.querySelector("#" + el.name)
            element.volume = localStorage.getItem(type) ? localStorage.getItem(type) : 0.5
        })
    }, 10);
}

export default soundVolume