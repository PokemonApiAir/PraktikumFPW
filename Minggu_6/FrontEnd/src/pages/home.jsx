import Navbar from "./components/navbar"
import { Outlet, useLoaderData } from "react-router-dom";

export default function Home() {
    const data = useLoaderData();
    
    return (
        <>
            <div className="min-w-screen min-h-screen h-screen flex flex-col">
                <Navbar first_name={data.first_name} last_name={data.last_name}/>
                <Outlet />
            </div>
        </>
    )
}