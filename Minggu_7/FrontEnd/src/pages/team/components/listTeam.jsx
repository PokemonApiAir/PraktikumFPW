import { Link } from "react-router-dom";

import handlerTeam from "../../../handler/handlerTeam";

export default function ListTeam({data}) {
    const deleteTeam = (id) => {
        handlerTeam.deleteTeam(id);
    }

    return (
        <>
            <div className="w-full h-12 flex justify-around items-center text-lg gap-x-4 px-12">
                <h1 className="w-2/12 text-center">{data.name}</h1>
                <h1 className="w-2/12 text-start">{data.coach}</h1>
                <h1 className="w-2/12 text-center">{data.record.win}</h1>
                <h1 className="w-2/12 text-center">{data.record.draw}</h1>
                <h1 className="w-2/12 text-center">{data.record.lose}</h1>
                <div className="w-2/12 h-8 text-center flex">
                    <Link className="w-1/2 h-full bg-gray-200 rounded-l hover:opacity-75 pt-0.5" to={`/team/edit/${data._id}`}>Edit</Link>
                    <button className="w-1/2 h-full bg-red-500 rounded-r hover:opacity-75" onClick={() => deleteTeam(data._id)}>Delete</button>
                </div>
            </div>
        </>
    )
}