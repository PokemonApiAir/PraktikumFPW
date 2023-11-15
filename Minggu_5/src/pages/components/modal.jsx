import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addHistory } from '../../app/historySlice';
import { clearCart, removeCart } from '../../app/cartSlice';
import axios from 'axios'

export default function Modal({onClose}) {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const cart = useSelector((state) => state.cart.cart);
    const dispacth = useDispatch();

    const dateToString = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const fetch = async () => {
        setIsLoading(true);
        const temp_array = [];
        for (let i = 0; i < cart.length; i++) {
            const temp = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${cart[i]}`);
            const data = {
                dealID: cart[i],
                title: temp.data.gameInfo.name,
                thumb: temp.data.gameInfo.thumb,
                releaseDate: temp.data.gameInfo.releaseDate,
                price: parseFloat(temp.data.gameInfo.salePrice)
            }
            temp_array.push(data);
        }
        setList([...temp_array]);
        setIsLoading(false);
    }

    const countTotal = () => {
        let total = 0;
        for (let i = 0; i < list.length; i++) {
            total += list[i].price;
        }
        return total.toFixed(2);
    }

    const checkout = () => {
        const date = new Date();
        const data = {
            total: countTotal(),
            tanggal_checkout: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " (" + (date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()) + ":" + (date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes())   + ")",
            data: []
        }

        for (let i = 0; i < list.length; i++) {
            const temp = {
                title: list[i].title,
                thumb: list[i].thumb,
                price: parseFloat(list[i].price)
            }
            data.data.push(temp);
        }

        dispacth(addHistory(data));
        dispacth(clearCart());
    }

    useEffect(() => {
        fetch();
    }, [cart])

    return (
        <>
            <dialog className="z-50 fixed w-1/4 h-2/4 mt-24 flex flex-col justify-start items-center bg-catalog-card rounded-lg">
                <div className="w-full h-8 flex justify-between items-center px-2 pt-2">
                    <h1 className="text-white text-2xl">Cart</h1>
                    <button className="" onClick={onClose}>❌</button>
                </div>
                {isLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-xl text-white">Loading...</p>
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col itemx-center">
                        <div className="overflow-y-scroll w-full h-4/6 flex flex-col justify-start gap-y-0.5">
                            {list.map((item, idx) => (
                                <div key={idx} className='w-full h-16 flex items-center'>
                                    <div className='w-6/12 h-full py-1 ps-2'>
                                        <p className='text-white text-sm pt-1.5'>{item.title}</p>
                                        <p className='text-release text-2xs pt-2'>release on {dateToString(item.releaseDate)}</p>
                                    </div>
                                    <p className="w-4/12 text-end text-white text-lg">${item.price}</p>
                                    <div className='w-2/12 flex justify-end h-full me-6'>
                                        <button onClick={() => {
                                            dispacth(removeCart(item.dealID));
                                        }} className="text-sm text-red-600 text-end hover:opacity-50">🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full text-white flex justify-between mt-4">
                            <h1 className="w-1/2 text-start ms-3">Total</h1>
                            <h1 className="w-1/2 text-end me-4">${countTotal()}</h1>
                        </div>
                        <button onClick={checkout} className="w-full text-white hover:opacity-50 mt-3">Checkout</button>
                    </div>
                )}
            </dialog>
        </>
    );
}