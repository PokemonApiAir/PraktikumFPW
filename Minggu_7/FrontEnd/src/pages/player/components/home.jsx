import ListPlayer from "./listPlayer";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom"

export default function Home() {
    const [page, setPage] = useState(0);
    const [player, setPlayer] = useState([]);
    const data = useLoaderData();

    const fetch = () => {
        const startIndex = page * 10;
        const endIndex = startIndex + 9;
        setPlayer(data.slice(startIndex, endIndex))
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
                    <h1 className="text-4xl font-bold">Player</h1>
                    <Link className="w-12 h-12 text-3xl flex justify-center items-center bg-gray-200 rounded-full ms-2 hover:opacity-75 pb-1" to={`/player/add`}>+</Link>
                </div>
                <div className="w-9/12 h-full flex flex-col rounded-xl gap-y-3 border border-black pb-2 mt-12">
                    <div className="w-full h-12 flex justify-around items-center text-xl font-medium bg-gray-200 rounded-t-xl gap-x-4 px-12">
                        <h1 className="w-3/12 text-center">Name</h1>
                        <h1 className="w-1/12 text-center">Age</h1>
                        <h1 className="w-2/12 text-center">Position</h1>
                        <h1 className="w-2/12 text-center">Nationality</h1>
                        <h1 className="w-2/12 text-center">Number</h1>
                        <h1 className="w-2/12 text-center">Action</h1>
                    </div>
                    {player.map((item, idx) => (
                        <ListPlayer key={idx} data={item}/>
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