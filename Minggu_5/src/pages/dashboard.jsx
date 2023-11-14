import { useState, useEffect } from "react";
import {useSelector} from "react-redux"

// Component
import Navbar from './components/navbar'

// Pages
import Home from './home'
import Catalog from './catalog'
import Wishlist from './Wishlist'

export default function Dashboard() {
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const route = useSelector((state) => state.route.route);

    return (
        <>
            <div className="min-h-screen h-full w-full flex flex-col justify-start items-center bg-content pb-16">
                <Navbar/>
                {route == "home" && <Home/>}
                {route == "catalog" && <Catalog/>}
                {route == "wishlist" && <Wishlist/>}
            </div>
        </>
    )
}