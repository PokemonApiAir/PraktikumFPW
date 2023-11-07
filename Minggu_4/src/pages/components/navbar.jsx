import Uap from '../../assets/uap.png'

export default function Navbar({setRoute}) {
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
                    <button onClick={home} className="text-slate-400 font-medium">Home</button>
                    <button onClick={catalog} className="text-slate-400 font-medium">Catalog</button>
                    <button onClick={wishlist} className="text-slate-400 font-medium">Wishlist</button>
                </div>
            </div>
        </>
    )
}