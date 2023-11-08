import {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

import CatalogCard from './catalogCard';

export default function Catalog({wishlist, setWishlist}) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [catalog, setCatalog] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const submit = data => {
        setPage(0);
        setSearch(data.search);
    }

    const findId = (idToFind) => {
        const temp = wishlist.find(id => id === idToFind);
        if (temp) {
            return true;
        }
        return false;
    }

    const removeFromWishlist = (idToRemove) => {
        const newData = wishlist.filter(id => id !== idToRemove);
        setWishlist([...newData]);
    }

    const addToWishlist = (id) => {
        setWishlist([...wishlist, id])
    }

    const fetch = async () => {
        setIsLoading(true);
        const get_catalog = await axios(`https://www.cheapshark.com/api/1.0/deals`, {
            params: {
                pageNumber: page,
                title: search,
                pageSize: 10,
                storeID: 1
            }
        });
        setCatalog(get_catalog.data);
        setIsLoading(false);
    }

    const dateToString = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const next = () => {
        if((page + 1) <= 558){
            setPage(page + 1);
        }
    }

    const previous = () => {
        if((page - 1) >= 0){
            setPage(page - 1);
        }
    }

    useEffect(() => {
        fetch();
    }, [search, page])

    return (
        <>
            <div className="w-6/12 h-full">
                {isLoading &&
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <form onSubmit={handleSubmit(submit)} className="w-full h-5 flex justify-end my-4 h-5">
                        <input {...register('search')} className="h-full bg-search rounded-l text-white text-sm ps-1" type="text" placeholder="Search" id="" />
                        <button type='submit' className="h-full w-5 bg-icon-search rounded-r text-xs">🔍</button>
                    </form>
                    <div className='w-full h-full flex justify-center items-center mt-64 loader'>
                        <div className="tile"></div>
                    </div>
                </div>}
                {!isLoading && catalog.length > 0 ?(
                    <div className='w-full h-full flex flex-col'>
                        <form onSubmit={handleSubmit(submit)} className="w-full h-5 flex justify-end my-4 h-5">
                            <input {...register('search')} className="h-full bg-search rounded-l text-white text-sm ps-1" type="text" placeholder="Search" id="" />
                            <button type='submit' className="h-full w-5 bg-icon-search rounded-r text-xs">🔍</button>
                        </form>
                        <div className="w-full h-full flex flex-col gap-y-1">
                            {catalog && catalog.map((item, idx) => (
                                <CatalogCard key={idx} item={item} dateToString={dateToString} findId={findId} removeFromWishlist={removeFromWishlist} addToWishlist={addToWishlist}/>
                            ))}
                        </div>
                        <div className='w-full h-8 flex justify-center items-center mt-6'>
                            <button onClick={previous} className='bg-slate-300 h-full w-8 rounded-l-lg opacity-50 hover:opacity-25'>
                                <svg className='h-full w-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <h1 className='bg-slate-300 w-8 h-full text-lg text-center opacity-50'>{page + 1}</h1>
                            <button onClick={next} className='bg-slate-300 h-full w-8 rounded-r-lg opacity-50 hover:opacity-25'>
                                <svg className='h-full w-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : !isLoading && catalog.length === 0 ? (
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        <form onSubmit={handleSubmit(submit)} className="w-full h-5 flex justify-end my-4 h-5">
                            <input {...register('search')} className="h-full bg-search rounded-l text-white text-sm ps-1" type="text" placeholder="Search" id="" />
                            <button type='submit' className="h-full w-5 bg-icon-search rounded-r text-xs">🔍</button>
                        </form>
                        <div className='w-full h-full flex justify-center items-center'>
                            <h1 className="text-2xl text-slate-400 mt-52">Data not Found!!</h1>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}