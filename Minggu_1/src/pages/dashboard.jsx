import data from "../assets/data.json"
import Right from "./components/right"
import Left from "./components/left"

export default function Dashboard() {
    const randData = Math.floor(Math.random() * data.length);

    return (
        <>
            <div className="w-screen h-screen gap-x-12 bg-slate-400 flex justify-center items-center">
                <Left dataList={data}/>
                <Right data={data[randData]}/>
            </div>
        </>
    )    
}