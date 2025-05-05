import Checkbox from "./Checkbox"

const Difficulty = () => {
    return (
      <div className="difficulty w-[260px] flex justify-around items-center absolute bottom-44 [&>label]:w-[34px] [&>label]:h-[30px] [&>label]:scale-90 [&>label]:cursor-pointer [&>label:hover]:brightness-125">
          <Checkbox id="easy" />
          <Checkbox id="normal" />
          <Checkbox id="hard" />
      </div>
    )
}

export default Difficulty