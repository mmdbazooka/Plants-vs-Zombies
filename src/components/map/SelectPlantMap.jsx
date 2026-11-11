const SelectPlantMap = ({ plants, disabledIds = [], onPick, removing = false }) => (
    plants.map(plant => (
        <button key={plant.id} type="button" disabled={disabledIds.includes(plant.id)}
            aria-label={`${removing ? 'Remove' : 'Select'} ${plant.image.replace('.png', '')}`}
            className="card w-[60px] h-[70px] relative shrink-0 disabled:brightness-50"
            onClick={() => onPick(plant)}>
            <img src={`../src/assets/images/plants/${plant.image}`} alt="" className="w-[40px] h-[40px] absolute top-[10px] left-[7px]" />
            <span className="absolute bottom-[-1px] left-[18px] text-[13px]">{plant.price}</span>
        </button>
    ))
)

export default SelectPlantMap
