import { useState, useEffect } from "react";

import Navbar from './components/navbar'
import Home from './components/home'
import Catalog from './components/catalog'
import Wishlist from './components/Wishlist'

export default function Dashboard() {
    const [wishlist, setWishlist] = useState([]);
    const [route, setRoute] = useState("home");

    return (
        <>
            <div className="min-h-screen h-full w-full flex flex-col justify-start items-center bg-content pb-16">
                <Navbar route={route} setRoute={setRoute}/>
                {route == "home" && <Home wishlist={wishlist} setWishlist={setWishlist}/>}
                {route == "catalog" && <Catalog wishlist={wishlist} setWishlist={setWishlist}/>}
                {route == "wishlist" && <Wishlist wishlist={wishlist} setWishlist={setWishlist}/>}
            </div>
        </>
    )
}