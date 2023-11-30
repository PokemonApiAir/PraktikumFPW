import { NavLink, Outlet } from "react-router-dom"
import Navbar from "./component/navbar"

export default function Dashboard() {
    return (
        <>
            <div className="min-w-screen min-h-screen flex flex-col justify-start items-center">
                <Navbar/>
                <Outlet/>
            </div>
        </>
    )
}