import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="w-full h-24 flex items-center px-10">
                <div className="w-1/2 flex justify-start items-center gap-x-12">
                    <h1 className="text-2xl font-bold">Kisahku</h1>
                    <NavLink className={(state) => {
                        return state.isActive ? "font-normal" : "font-medium"
                    }} to={`/home/story`}>Story</NavLink>
                    <NavLink className={(state) => {
                        return state.isActive ? "font-normal" : "font-medium"
                    }} to={`/home/profile`}>Profile</NavLink>
                    <NavLink>Logout</NavLink>
                </div>
                <div className="w-1/2 flex justify-end">
                    <p>Hi, Michael</p>
                </div>
            </div>
        </>
    )
}