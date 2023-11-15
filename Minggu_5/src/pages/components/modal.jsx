export default function Modal({onClose}) {
    const coba = ["coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba", "coba"];
    return (
        <>
            <dialog className="z-50 fixed w-1/4 h-2/4 mt-24 flex flex-col justify-start items-center bg-white">
                <div className="w-full h-8 flex justify-end items-center me-4">
                    <button className="" onClick={onClose}>❌</button>
                </div>
                <div className="overflow-y-scroll w-full flex flex-col justify-start gap-y-8">
                    {coba.map((item, idx) => (
                        <p key={idx} className="">{item}</p>
                    ))}
                </div>
                <button>Checkout</button>
            </dialog>
        </>
    );
}