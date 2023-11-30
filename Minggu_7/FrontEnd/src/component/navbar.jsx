import { NavLink, Link } from "react-router-dom"
import fifa from '../assets/fifa.png'

export default function Navbar() {
    return (
        <>
            <div className="w-full h-28 flex justify-center items-center bg-gray-200 text-2xl gap-x-24">
                <Link to={`/`}><img src={fifa} className="w-24" /></Link>
                <NavLink to={`/`} className={(state) => {
                    return state.isActive ? "underline" : ""
                }}>Home</NavLink>
                <NavLink to={`/player/home`} className={(state) => {
                    return state.isActive ? "underline" : ""
                }}>Player</NavLink>
                <NavLink to={`/team/home`} className={(state) => {
                    return state.isActive ? "underline" : ""
                }}>Team</NavLink>
                <NavLink to={`/match/home`} className={(state) => {
                    return state.isActive ? "underline" : ""
                }}>Match</NavLink>
            </div>
        </>
    )
}