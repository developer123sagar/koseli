interface TitleFormatType{
    title:string
}

const TitleFormat = (props:TitleFormatType) => {
    
    const titleContainerProp={
        padding:20,
        paddingBottom:0,
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom:20
    }
    
    return (
        <div className="titleContainer" style={titleContainerProp}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ height: 10, width: 30, marginRight: 20 }} className="bg-[#631418]  rounded-2xl"/>
                <h5> {props.title} </h5>
            </div>
        </div>
    )
}

export default TitleFormat;

