import { Link } from "react-router-dom"

export default function Start() {
    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <h1 className="text-2xl font-semibold">Kisahku</h1>
                <Link className="text-lg w-24 h-12 bg-gray-200 flex justify-center items-center rounded-xl mt-3" to={`/login`}>Start</Link>
            </div>
        </>
    )
}