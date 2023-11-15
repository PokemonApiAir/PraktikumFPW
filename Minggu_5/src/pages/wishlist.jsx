import { useEffect, useState } from "react"
import axios from 'axios'

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from '../app/wishlistSlice'
import { addCart } from '../app/cartSlice'

export default function Wishlist() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.wishlist);
    const cart = useSelector((state) => state.cart.cart);
    
    const removeFromWishlist = (idToRemove) => {
        dispatch(removeWishlist(idToRemove));
    }

    const dateToString = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const fetch = async () => {
        setIsLoading(true);
        const temp_array = [];
        for (let i = 0; i < wishlist.length; i++) {
            const temp = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${wishlist[i]}`);
            const data = {
                dealID: wishlist[i],
                title: temp.data.gameInfo.name,
                thumb: temp.data.gameInfo.thumb,
                releaseDate: temp.data.gameInfo.releaseDate,
            }
            temp_array.push(data);
        }
        setList([...temp_array]);
        setIsLoading(false);
    }

    const findIdCart = (idToFind) => {
        const temp = cart.find(id => id === idToFind);
        if (temp) {
            return true;
        }
        return false;
    }

    const addToCart = (id) => {
        dispatch(addCart(id))
    }

    useEffect(() => {
        fetch();
    }, [wishlist])

    return (
        <>
            <div className="w-6/12 h-full flex justify-center items-center">
                {isLoading && 
                <div className="w-full h-full flex justify-center mt-64 loader">
                    <div className="tile"></div>
                </div>}
                {!isLoading && list.length > 0 ? (
                    <div className='w-full h-full flex mt-2'>
                        <div className="w-full h-full flex flex-col gap-y-1">
                            {list && list.map((item, idx) => (
                                <div key={idx} className='w-full h-16 bg-catalog-card flex items-center'>
                                    <img className='w-3/12 h-full' src={item.thumb} alt="" />
                                    <div className='w-6/12 h-full py-1 ps-2'>
                                        <p className='text-white text-sm pt-1.5'>{item.title}</p>
                                        <p className='text-release text-2xs pt-2'>release on {dateToString(item.releaseDate)}</p>
                                    </div>
                                    <div className='w-3/12 flex flex-col items-end justify-center h-full me-6 gap-y-3'>
                                        <button onClick={() => {
                                            removeFromWishlist(item.dealID);
                                        }} className="text-2xs text-red-600 hover:opacity-50 hover:underline">REMOVE</button>
                                        {findIdCart(item.dealID) ? (
                                            <button onClick={() => {
                                                addToCart(item.dealID);
                                            }} className="text-2xs text-green-400 hover:opacity-50 hover:underline opacity-50" disabled>ADD TO CART</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToCart(item.dealID);
                                            }} className="text-2xs text-green-400 hover:opacity-50 hover:underline">ADD TO CART</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : !isLoading && list.length === 0 ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <h1 className="text-2xl text-slate-400 mt-64">Add Wishlist First!!</h1>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}