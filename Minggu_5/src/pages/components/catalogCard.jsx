export default function CatalogCard({item, dateToString, findId, removeFromWishlist, addToWishlist, findIdCart, addToCart}) {
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
                <div className='1/12 rounded bg-slate-300'>
                    {findId(item.dealID) == true ? (
                        <button onClick={() => {
                            removeFromWishlist(item.dealID);
                        }} className="text-sm hover:opacity-50 py-1 px-1">❤️</button>
                    ) : (
                        <button onClick={() => {
                            addToWishlist(item.dealID);
                        }} className="text-sm hover:opacity-50 py-1 px-1">🖤</button>
                    )}
                    {findIdCart(item.dealID) == true ? (
                        <button onClick={() => {
                            alert("Item sudah ada di dalam cart");
                        }} className="text-xs p-1 opacity-50" disabled>🛒</button>
                    ) : (
                        <button onClick={() => {
                            addToCart(item.dealID);
                            alert(item.title + " berhasil ditambahkan ke cart");
                        }} className="text-xs p-1">🛒</button>
                    )}
                </div>
            </div>
        </>
    )
}