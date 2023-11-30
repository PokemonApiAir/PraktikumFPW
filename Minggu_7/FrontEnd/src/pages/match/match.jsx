import { Outlet } from "react-router-dom"

export default function Match() {
    return (
        <>
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </>
    )
}