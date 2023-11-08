import Uap from '../../assets/uap.png'

export default function Navbar({route, setRoute}) {
    const home = () => {
        setRoute("home")
    }

    const catalog = () => {
        setRoute("catalog")
    }

    const wishlist = () => {
        setRoute("wishlist")
    }

    return (
        <>
            <div className="h-20 w-full bg-navbar flex justify-center items-center">
                <img className='h-12 w-12 me-2' src={Uap} alt="" />
                <button onClick={home} className="text-slate-400 text-2xl font-semibold me-8">Uap</button>
                <div className='flex justify-center items-center gap-x-10'>
                    {route == "home" ? (
                        <button onClick={home} className="text-slate-400 font-medium underline">Home</button>
                    ) : (
                        <button onClick={home} className="text-slate-400 font-medium hover:underline">Home</button>
                    )}
                    {route == "catalog" ? (
                        <button onClick={catalog} className="text-slate-400 font-medium underline">Catalog</button>
                    ) : (
                        <button onClick={catalog} className="text-slate-400 font-medium hover:underline">Catalog</button>
                    )}
                    {route == "wishlist" ? (
                        <button onClick={wishlist} className="text-slate-400 font-medium underline">Wishlist</button>
                    ) : (
                        <button onClick={wishlist} className="text-slate-400 font-medium hover:underline">Wishlist</button>
                    )}
                </div>
            </div>
        </>
    )
}