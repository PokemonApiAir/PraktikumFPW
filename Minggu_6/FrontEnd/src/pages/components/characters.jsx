import { useLoaderData, NavLink, Link, Outlet } from "react-router-dom"

export default function Characters() {
    const data = useLoaderData();

    return (
        <>
            <div className="w-full h-4/6 px-24 flex">
                <div className="w-full h-full border border-black rounded-lg flex">
                    <div className="w-3/12 h-full border border-black rounded-l-lg">
                        {data.map(item => (
                            <NavLink key={item.id_chara} className={(state) => {
                                return (state.isActive ? "bg-gray-100" : "") + ` w-full h-24 flex flex-col justify-center items-start gap-y-1 px-4 border border-black ${item.id == 1 ? " rounded-tl-lg" : ""}`
                            }} to={`${item.id_chara}`}>
                                <h1 className="text-xl font-semibold">{item.nama}</h1>
                                {item.peran === "NPC" && <p className="text-sm">Side Character</p>}
                                {item.peran === "MC" && <p className="text-sm">Main Character</p>}
                            </NavLink>
                        ))}
                        <Link className="w-full h-24 text-gray-400 text-xl font-semibold flex justify-center items-center gap-y-1 px-4 border border-black rounded-bl-lg hover:opacity-75" to={`new`}>
                            <p className="opacity-50">➕</p>
                            <p>Tambah Baru</p>
                        </Link>
                    </div>
                    <div className="w-9/12 h-full">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}