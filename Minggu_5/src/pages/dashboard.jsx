import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, decrementByAmount } from "../app/reduxSlice";

export default function Dashboard() {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <>
            <div className="min-w-screen min-h-screen flex flex-col justify-center items-center bg-black text-white">
                <p>{count}</p>
                <div className="w-1/12 flex rounded justify-center bg-slate-500 gap-x-8 pb-1">
                    <button className="w-1/2" onClick={() => dispatch(decrementByAmount(2))}>-</button>
                    <button className="w-1/2" onClick={() => dispatch(incrementByAmount(2))}>+</button>
                </div>
            </div>
        </>
    )
}