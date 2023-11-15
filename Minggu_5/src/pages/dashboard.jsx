import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import CartModal from './components/modal';

// Component
import Navbar from './components/navbar'

// Pages
import Home from './home'
import Catalog from './catalog'
import Wishlist from './Wishlist'

export default function Dashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const route = useSelector((state) => state.route.route);

    const showModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            {isModalOpen && <CartModal className='w-full h-screen flex' onClose={closeModal} />}
            <div className="min-h-screen h-full w-full flex flex-col justify-start items-center bg-content pb-16">
                <Navbar showModal={showModal} closeModal={closeModal}/>
                {route == "home" && <Home/>}
                {route == "catalog" && <Catalog/>}
                {route == "wishlist" && <Wishlist/>}
            </div>
        </>
    )
}