import Showdata from "./showdata"

export default function Left(props) {
    return (
        <>
            <div className="left w-1/2 h-3/4 bg-gray-300 rounded-lg ps-12 pt-8">
                <h1 className="text-3xl font-semibold pb-8">List Penerbangan</h1>
                <div className="list-penerbangan overflow-y-scroll h-4/5">
                    {props.dataList.map((data, index) => (
                        <div key={index} className="flex flex-row h-24 w-11/12 bg-white rounded-lg my-4">
                            <Showdata data={data}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}