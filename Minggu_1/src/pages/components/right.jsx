import Detail from "./detail"

export default function Right(props) {
    const itemData = props.data;

    return (
        <>
            <div className="right w-1/3 h-3/4 bg-white rounded-lg ps-12 pt-8 pe-12">
                <h1 className="text-4xl font-semibold pb-8">{itemData.pesawat.maskapai} - {itemData.pesawat.model}</h1>
                <Detail data={itemData}/>
            </div>
        </>
    )
}