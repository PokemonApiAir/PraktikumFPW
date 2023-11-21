import { useLoaderData, NavLink, Outlet } from "react-router-dom"

export default function ShowDetail() {
    const data = useLoaderData();

    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-24 px-24 flex">
                    <div className="w-1/2 h-full flex justify-start items-center">
                        <h1 className="text-2xl font-semibold">{data.judul}</h1>
                    </div>
                    <div className="w-1/2 h-full flex justify-end items-center gap-x-4">
                        <NavLink className={(state) => {
                            return (state.isActive ? "font-semibold" : "font-normal") + " w-40 h-10 bg-gray-200 flex justify-center items-center hover:opacity-75";
                        }} to={`overview`}>Overview</NavLink>
                        <NavLink className={(state) => {
                            return (state.isActive ? "font-semibold" : "font-normal") + " w-40 h-10 bg-gray-200 flex justify-center items-center hover:opacity-75";
                        }} to={`characters`}>Characters</NavLink>
                    </div>
                </div>
                <Outlet/>
            </div>
        </>
    )
}