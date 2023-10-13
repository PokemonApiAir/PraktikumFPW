import { useState } from "react"
import Handle from "./components/handle";

export default function Dashboard() {
    const [data, setData] = useState("Tes");
    return (
        <>
            <div>
                <h1>{data}</h1>
                <Handle data={data} setData={setData}/>
            </div>
        </>
    )
}