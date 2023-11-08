import { useState, useEffect } from "react";
import axios from 'axios';

export default function Home({wishlist, setWishlist}) {
    const [isLoading, setIsLoading] = useState(false);
    const [idNewRelease, setIdNewRelease] = useState(0)

    const [bestData, setBestData] = useState();
    const [newReleaseData, setNewReleaseData] = useState();
    const [metacriticData, setMetacriticData] = useState();

    const fetchData = async() => {
        setIsLoading(true);

        const best = await axios(`https://www.cheapshark.com/api/1.0/deals`, {
            params: {
                storeID: 1,
                pageSize: 5
            }
        });
        const newRelease = await axios(`https://www.cheapshark.com/api/1.0/deals`, {
            params: {
                storeID: 1,
                sortBy: "Release",
                pageSize: 5
            }
        });
        const metacritic = await axios(`https://www.cheapshark.com/api/1.0/deals`, {
            params: {
                storeID: 1,
                sortBy: "Metacritic",
                pageSize: 5
            }
        });

        setBestData(best.data);
        setNewReleaseData(newRelease.data);
        setMetacriticData(metacritic.data);
        setIsLoading(false);
    }

    const dateToString = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
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

    const next = () => {
        if(idNewRelease === 4){
            setIdNewRelease(0);
        }else{
            setIdNewRelease(idNewRelease + 1);
        }
    }

    const previous = () => {
        if(idNewRelease === 0){
            setIdNewRelease(4);
        }else{
            setIdNewRelease(idNewRelease - 1);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div className="w-6/12 h-full flex justify-center items-center">
                {isLoading && 
                <div className="w-full h-full flex justify-center mt-64 loader">
                    <div className="tile"></div>
                </div>}
                {!isLoading && 
                <div className="h-full w-full flex flex-col">
                    {newReleaseData && 
                    <div id="new-release" className="flex flex-col w-full h-64 mt-6">
                        <h1 className="text-xl text-slate-400 my-1 text-center">New Release</h1>
                        <div className="w-full h-full flex justify-between items-center bg-new-release relative rounded-lg">
                            <button onClick={next} className="h-full flex justify-start items-center">
                                <svg className="w-12 h-full bg-slate-300/30 rounded-l-lg hover:bg-slate-300/10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <div className="w-9/12 h-full flex justify-center items-center">
                                <img className={`w-11/12`} src={newReleaseData[idNewRelease].thumb} />
                            </div>
                            <div className="w-3/12 h-full flex flex-col pt-6 pb-8">
                                <div className="h-1/2 flex flex-col justify-start items-start gap-y-1">
                                    <h1 className="text-white text-sm font-medium">{newReleaseData[idNewRelease].title}</h1>
                                    {findId(newReleaseData[idNewRelease].dealID) == true ? (
                                        <button onClick={() => {
                                            removeFromWishlist(newReleaseData[idNewRelease].dealID);
                                        }} className="text-cyan-400 text-xs hover:underline">- Wishlist</button>
                                    ) : (
                                        <button onClick={() => {
                                            addToWishlist(newReleaseData[idNewRelease].dealID);
                                        }} className="text-cyan-400 text-xs hover:underline">+ Wishlist</button>
                                    )}
                                </div>
                                <div className="h-1/2 flex flex-col justify-end items-start">
                                    <p className="text-release text-2xs pb-1">Released on {dateToString(newReleaseData[idNewRelease].releaseDate)}</p>
                                    <p className="w-24 text-white text-xs bg-info text-center">Now Available</p>
                                    <div className="w-full flex pt-3">
                                        {newReleaseData[idNewRelease].isOnSale == "1" ? (
                                            <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${newReleaseData[idNewRelease].normalPrice}</p>
                                        ) : (
                                            <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${newReleaseData[idNewRelease].normalPrice}</p>
                                        )}
                                        {newReleaseData[idNewRelease].isOnSale == "1" ? (
                                            <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${newReleaseData[idNewRelease].salePrice}</p>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button onClick={previous} className="h-full flex justify-end items-center">
                                <svg className="w-12 h-full bg-slate-300/30 rounded-r-lg hover:bg-slate-300/10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>}
                    {bestData &&
                    <div id="best" className="w-full h-80 flex flex-col my-4">
                        <h1 className="text-xl text-slate-400 my-1">Best Offers</h1>
                        <div className="w-full h-full flex gap-x-4">
                            <div className="w-1/3 h-full bg-card">
                                <img className="w-full" src={bestData[0].thumb}/>
                                <div className="w-full h-full flex flex-col items-start py-4 px-3 gap-y-1">
                                    <div className="w-full h-1/3 flex flex-col">
                                        <p className="text-white text-base font-medium">{bestData[0].title}</p>
                                        <p className="text-white text-sm">Rating : <span className="font-medium">{bestData[0].dealRating}</span></p>
                                    </div>
                                    <div className="w-full h-2/3 flex flex-col items-start gap-y-1">
                                        <div className="w-full flex pt-3">
                                            {bestData[0].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${bestData[0].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${bestData[0].normalPrice}</p>
                                            )}
                                            {bestData[0].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${bestData[0].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        {findId(bestData[0].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(bestData[0].dealID);
                                            }} className="text-cyan-400 text-xs hover:underline">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(bestData[0].dealID);
                                            }} className="text-cyan-400 text-xs hover:underline">+ Wishlist</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full flex flex-col gap-y-2">
                                <div className="w-full h-1/2 bg-card relative flex">
                                    <div className="w-full absolute flex flex-col mb-1">
                                        <img className="w-full" src={bestData[1].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{bestData[1].title}</p>
                                    </div>
                                    <div className="w-full t-3 flex justify-start items-end">
                                        {findId(bestData[1].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(bestData[1].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(bestData[1].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {bestData[1].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${bestData[1].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${bestData[1].normalPrice}</p>
                                            )}
                                            {bestData[1].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${bestData[1].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-1/2 bg-card relative">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={bestData[2].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{bestData[2].title}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(bestData[2].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(bestData[2].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(bestData[2].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {bestData[2].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${bestData[2].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${bestData[2].normalPrice}</p>
                                            )}
                                            {bestData[2].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${bestData[2].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full flex flex-col gap-y-2">
                                <div className="w-full h-1/2 bg-card relative flex">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={bestData[3].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{bestData[3].title}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(bestData[3].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(bestData[3].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(bestData[3].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {bestData[3].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${bestData[3].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${bestData[3].normalPrice}</p>
                                            )}
                                            {bestData[3].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${bestData[3].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-1/2 bg-card relative">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={bestData[4].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{bestData[4].title}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(bestData[4].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(bestData[4].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(bestData[4].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {bestData[4].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${bestData[4].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${bestData[4].normalPrice}</p>
                                            )}
                                            {bestData[4].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${bestData[4].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {metacriticData &&
                    <div id="best" className="w-full h-80 flex flex-col my-4">
                        <h1 className="text-xl text-slate-400 my-1 text-end">Best Metacritic Score</h1>
                        <div className="w-full h-full flex gap-x-4">
                            <div className="w-1/3 h-full flex flex-col gap-y-2">
                                <div className="w-full h-1/2 bg-card relative flex">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={metacriticData[1].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{metacriticData[1].title + " (" + metacriticData[1].metacriticScore + ")"}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(metacriticData[1].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(metacriticData[1].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(metacriticData[1].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {metacriticData[1].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${metacriticData[1].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${metacriticData[1].normalPrice}</p>
                                            )}
                                            {metacriticData[1].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${metacriticData[1].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-1/2 bg-card relative">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={metacriticData[2].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{metacriticData[2].title + " (" + metacriticData[2].metacriticScore + ")"}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(metacriticData[2].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(metacriticData[2].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(metacriticData[2].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {metacriticData[2].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${metacriticData[2].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${metacriticData[2].normalPrice}</p>
                                            )}
                                            {metacriticData[2].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${metacriticData[2].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full flex flex-col gap-y-2">
                                <div className="w-full h-1/2 bg-card relative flex">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={metacriticData[3].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{metacriticData[3].title + " (" + metacriticData[3].metacriticScore + ")"}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(metacriticData[3].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(metacriticData[3].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(metacriticData[3].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {metacriticData[3].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${metacriticData[3].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${metacriticData[3].normalPrice}</p>
                                            )}
                                            {metacriticData[3].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${metacriticData[3].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-1/2 bg-card relative">
                                    <div className="w-full absolute">
                                        <img className="w-full" src={metacriticData[4].thumb}/>
                                        <p className="text-white text-xs font-medium pt-1 ps-2">{metacriticData[4].title + " (" + metacriticData[4].metacriticScore + ")"}</p>
                                    </div>
                                    <div className="w-full h-full flex justify-start items-end">
                                        {findId(metacriticData[4].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(metacriticData[4].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(metacriticData[4].dealID);
                                            }} className="w-4/12 text-cyan-400 text-xs hover:underline pb-1">+ Wishlist</button>
                                        )}
                                        <div className="w-8/12 flex justify-end">
                                            {metacriticData[4].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${metacriticData[4].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">{$metacriticData[4].normalPrice}</p>
                                            )}
                                            {metacriticData[4].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${metacriticData[4].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full bg-card">
                                <img className="w-full" src={metacriticData[0].thumb}/>
                                <div className="w-full h-full flex flex-col items-start py-4 px-3 gap-y-1">
                                    <div className="w-full h-1/3 flex flex-col">
                                        <p className="text-white text-base font-medium">{metacriticData[0].title}</p>
                                        <p className="text-white text-sm">Score : <span className="font-medium">{metacriticData[0].metacriticScore}</span></p>
                                    </div>
                                    <div className="w-full h-2/3 flex flex-col items-start gap-y-1">
                                        <div className="w-full flex pt-3">
                                            {metacriticData[0].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-normal bg-normal line-through flex justify-center items-center">${metacriticData[0].normalPrice}</p>
                                            ) : (
                                                <p className="w-28 h-6 text-normal bg-normal flex justify-center items-center">${metacriticData[0].normalPrice}</p>
                                            )}
                                            {metacriticData[0].isOnSale == "1" ? (
                                                <p className="w-14 h-6 text-sale bg-sale flex justify-center items-center">${metacriticData[0].salePrice}</p>
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        {findId(metacriticData[0].dealID) == true ? (
                                            <button onClick={() => {
                                                removeFromWishlist(metacriticData[0].dealID);
                                            }} className="text-cyan-400 text-xs hover:underline">- Wishlist</button>
                                        ) : (
                                            <button onClick={() => {
                                                addToWishlist(metacriticData[0].dealID);
                                            }} className="text-cyan-400 text-xs hover:underline">+ Wishlist</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>}
            </div>
        </>
    )
}