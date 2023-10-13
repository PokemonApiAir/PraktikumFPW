export default function Showdata(props) {
    const itemData = props.data;

    return (
        <>
            <div className="w-full flex justify-between">
                <div className="item-left ps-3 pt-2 w-1/2">
                    <h1
                        className="font-semibold text-xl"
                    >
                        {itemData.asal.alias} - {itemData.tujuan.alias}
                    </h1>
                    <p className="text-base">{itemData.jadwal.berangkat.tanggal}</p>
                    <p>{itemData.pesawat.maskapai} - {itemData.pesawat.model}</p>
                </div>
                <div className="flex flex-col justify-center items-end gap-y-2 pe-3 pt-2 w-1/2">
                    {(itemData.jenis == "internasional") ? (
                        <p className="bg-sky-400 px-3 py-0.5 rounded-lg">Internasional</p>
                    ) : (
                        <p className="bg-teal-400 px-3 py-0.5 rounded-lg">Domestik</p>
                    )}
                    <p>Depart On {itemData.jadwal.berangkat.jam}</p>
                </div>
            </div>
        </>
    )
}