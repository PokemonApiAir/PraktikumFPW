import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom"

import ListMatch from "./listMatch";

export default function Match() {
    const [page, setPage] = useState(0);
    const [match, setMatch] = useState([]);
    const data = useLoaderData();

    const fetch = () => {
        const startIndex = page * 10;
        const endIndex = startIndex + 9;
        setMatch(data.slice(startIndex, endIndex))
    }

    useEffect(() => {
        fetch();
    }, [page])

    const prev = () => {
        if(page - 1 >= 0){
            setPage(page - 1);
        }
    }

    const next = () => {
        setPage(page + 1);
    }

    return (
        <>
            <div className="w-full h-5/6 flex flex-col justify-center items-center">
                <div className="w-9/12 h-16 flex justify-center items-center relative mt-8">
                    <h1 className="text-4xl font-bold">Match</h1>
                    <Link className="w-12 h-12 text-3xl flex justify-center items-center bg-gray-200 rounded-full ms-2 hover:opacity-75 pb-1" to={`/match/add`}>+</Link>
                </div>
                <div className="w-9/12 h-full flex flex-col rounded-xl gap-y-3 border border-black pb-2 mt-12">
                    <div className="w-full h-12 flex justify-around items-center text-xl font-medium bg-gray-200 rounded-t-xl gap-x-4 px-12">
                        <h1 className="w-2/12 text-center">Home</h1>
                        <h1 className="w-2/12 text-center">Away</h1>
                        <h1 className="w-2/12 text-center">Score Home</h1>
                        <h1 className="w-2/12 text-center">Score Away</h1>
                        <h1 className="w-2/12 text-center">Matchtime</h1>
                        <h1 className="w-2/12 text-center">Round</h1>
                    </div>
                    {match.map((item, idx) => (
                        <ListMatch key={idx} data={item}/>
                    ))}
                </div>
                <div className="flex bg-gray-200 rounded mt-4">
                    <button className="w-24 h-10 text-lg" onClick={prev}>Prev</button>
                    <p className="w-4 h-10 text-lg flex justify-center items-center">{page + 1}</p>
                    <button className="w-24 h-10 text-lg" onClick={next}>Next</button>
                </div>
            </div>
        </>
    )
}