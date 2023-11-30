import { Outlet } from "react-router-dom"

export default function Player() {
    return (
        <>
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </>
    )
}