export default function Menu(props) {
    const itemData = {...props.data} //Data 1 Menu
    return (
        <>
            <div className="data w-full flex items-center gap-x-2">
                <input id="set" type="text" className="w-12 h-9 py-0.5 rounded-lg border border-black text-center" placeholder="1" onChange={() => {}}/>
                <span>Set</span>
                {itemData.workout_name == "Menu Name" ? (
                    <input id="workout-name" type="text" className="w-5/6 h-9 py-0.5 ps-3 rounded-lg border border-black text-start" placeholder="Menu Name"/>
                ) : (
                    <input id="workout-name" type="text" className="w-5/6 h-9 py-0.5 ps-3 rounded-lg border border-black text-start" placeholder="Menu Name" defaultValue={itemData.workout_name}/>
                )}
                <input id="long" type="text" className="w-12 h-9 py-0.5 rounded-lg border border-black text-center" placeholder="10"/>
                <select name="time" id="time" className="w-24 pt-1 pb-1.5 ps-3 border border-black rounded-lg">
                    <option value="mins">mins</option>
                    <option value="secs">secs</option>
                    <option value="x">x</option>
                </select>
                <button onClick={() => {
                    props.deleteMenu(itemData.id);
                }} className="text-2xl ms-3">❌</button>
            </div>
        </>
    )
}