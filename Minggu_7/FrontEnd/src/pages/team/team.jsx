import { Outlet } from "react-router-dom"

export default function Team() {
    return (
        <>
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </>
    )
}