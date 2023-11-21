import { NavLink } from "react-router-dom";

export default function Navbar({first_name, last_name}) {
    return (
        <>
            <div className="w-full h-24 flex items-center px-10 bg-gray-200">
                <div className="w-1/2 flex justify-start items-center gap-x-12">
                    <h1 className="text-2xl font-bold">Kisahku</h1>
                    <NavLink className={(state) => {
                        return state.isActive ? "font-medium" : "font-normal"
                    }} to={`stories`}>Story</NavLink>
                    <NavLink className={(state) => {
                        return state.isActive ? "font-medium" : "font-normal"
                    }} to={`profile`}>Profile</NavLink>
                    <NavLink to={`/login`}>Logout</NavLink>
                </div>
                <div className="w-1/2 flex justify-end">
                    <p>Hi, {first_name} {last_name}</p>
                </div>
            </div>
        </>
    )
}