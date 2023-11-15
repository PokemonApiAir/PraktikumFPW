import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

export default function History() {
    const history = useSelector((state) => state.history.history);

    const [active, setActive] = useState(-1);
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetch = async () => {
        setIsLoading(true);
        const temp_array = [];
        for (let i = 0; i < history[active].data.length; i++) {
            const data = {
                title: history[active].data[i].title,
                thumb: history[active].data[i].thumb,
                price: history[active].data[i].price
            }
            temp_array.push(data);
        }
        setList([...temp_array]);
        setIsLoading(false);
    }

    useEffect(() => {
        if(active != -1){
            fetch()
        }
    }, [active])

    return (
        <>
            <div className="w-6/12 h-full flex justify-center items-center">
                {console.log(active)}
                {isLoading && 
                <div className="w-full h-full flex justify-center mt-64 loader">
                    <div className="tile"></div>
                </div>}
                {!isLoading && history.length > 0 ? (
                    <div className='w-full h-full flex mt-2'>
                        <div className="w-full h-full flex flex-col gap-y-1">
                            {history && history.map((item, idx) => (
                                <div key={idx} className='w-full h-full bg-catalog-card flex flex-col ps-4'>
                                    <div className="w-full flex h-16">
                                        <div className="w-1/2 flex flex-col items-start justify-center">
                                            <p className="text-white">{item.tanggal_checkout}</p>
                                            <p className="text-white">Total : ${item.total}</p>
                                        </div>
                                        <div className="w-1/2 flex justify-end items-center me-6 mt-3">
                                            <button onClick={() => {
                                                if(active == -1){
                                                    setActive(idx);
                                                }else{
                                                    setActive(-1);
                                                }
                                            }} className="h-10 w-10">
                                                {active === idx ? (
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#0F0F0F"/>
                                                    </svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14.2893 5.70708C13.8988 5.31655 13.2657 5.31655 12.8751 5.70708L7.98768 10.5993C7.20729 11.3805 7.2076 12.6463 7.98837 13.427L12.8787 18.3174C13.2693 18.7079 13.9024 18.7079 14.293 18.3174C14.6835 17.9269 14.6835 17.2937 14.293 16.9032L10.1073 12.7175C9.71678 12.327 9.71678 11.6939 10.1073 11.3033L14.2893 7.12129C14.6799 6.73077 14.6799 6.0976 14.2893 5.70708Z" fill="#0F0F0F"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col pb-3 gap-y-3">
                                        {active != -1 && active == idx &&
                                            list.map((item, idx) => (
                                                <div key={idx} className='w-full h-16 bg-catalog-card flex items-center'>
                                                    <img className='w-3/12 h-full' src={item.thumb} alt="" />
                                                    <div className='w-6/12 h-full py-1 ps-2'>
                                                        <p className='text-white text-sm pt-1'>{item.title}</p>
                                                        <p className='text-white text-sm pt-0.5'>${item.price}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : !isLoading && history.length === 0 ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <h1 className="text-2xl text-slate-400 mt-64">History empty!!</h1>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}