const Holder = ({id , z , rightStyle , topStyle , imgId , src}) => {
    return (
        <div id={id} className="absolute" style={{right : rightStyle , top :  topStyle  , zIndex : z}}>
            <img id={imgId} src={src} alt="" />
        </div>
    )
}

export default Holder