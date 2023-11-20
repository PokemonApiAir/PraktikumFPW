import Navbar from "./components/navbar"
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div className="min-w-screen min-h-screen flex flex-col">
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}