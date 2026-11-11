import { costumeParts, zombieImage } from '../../core/services/dataBase/zombatar'

export default function ZombieAppearance({ preset }) {
    return (
        <>
            <img src={zombieImage(`zombieColor/${preset.skin}.png`)} alt="" className="absolute right-[44px] top-[118.5px] z-20" />
            {costumeParts(preset).map(part => (
                <img key={part.path} src={zombieImage(part.path)} alt="" className="absolute"
                    style={{ right: `${part.right}%`, top: `${part.top}%`, zIndex: part.layer }} />
            ))}
        </>
    )
}
