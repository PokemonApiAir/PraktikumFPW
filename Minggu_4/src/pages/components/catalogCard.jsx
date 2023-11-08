export default function CatalogCard({item, dateToString, findId, removeFromWishlist, addToWishlist}) {
    return (
        <>
            <div className='w-full h-16 bg-catalog-card flex items-center'>
                <img className='w-3/12 h-full' src={item.thumb} alt="" />
                <div className='w-8/12 h-full py-1 ps-2'>
                    <p className='text-white text-sm'>{item.title + " (" + item.metacriticScore +  ")"}</p>
                    <div className='flex'>
                        {item.isOnSale == "1" ? (
                            <p className="w-10 h-5 text-normal text-xs bg-normal line-through flex justify-center items-center">${item.normalPrice}</p>
                        ) : (
                            <p className="w-20 h-5 text-normal text-xs bg-normal flex justify-center items-center">${item.normalPrice}</p>
                        )}
                        {item.isOnSale == "1" ? (
                            <p className="w-10 h-5 text-sale text-xs bg-sale flex justify-center items-center">${item.salePrice}</p>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <p className='text-release text-2xs pt-1'>release on {dateToString(item.releaseDate)}</p>
                </div>
                <div className='1/12'>
                    {findId(item.dealID) == true ? (
                        <button onClick={() => {
                            removeFromWishlist(item.dealID);
                        }} className="text-sm hover:opacity-50 bg-slate-300 rounded py-1 px-1">❤️</button>
                    ) : (
                        <button onClick={() => {
                            addToWishlist(item.dealID);
                        }} className="text-sm hover:opacity-50 bg-slate-400 rounded py-1 px-1">🖤</button>
                    )}
                </div>
            </div>
        </>
    )
}