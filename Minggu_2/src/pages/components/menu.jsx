export default function Menu(props) {
    const itemData = {...props.data} //Data 1 Menu

    return (
        <>
            <div className="w-full flex items-center gap-x-2">
                <input type="text" className="w-12 h-9 py-0.5 rounded-lg border border-black text-center" placeholder="1"/>
                <span>Set</span>
                {itemData.workout_name == "Menu Name" ? (
                    <input onChange={() => {
                        props.handleInputChange(event, props.index);
                    }} type="text" className="workout-name w-5/6 h-9 py-0.5 ps-3 rounded-lg border border-black text-start" placeholder="Menu Name"/>
                ) : (
                    <input onChange={() => {
                        handleInputChange(event, props.index);
                    }} type="text" className="workout-name w-5/6 h-9 py-0.5 ps-3 rounded-lg border border-black text-start" placeholder="Menu Name" defaultValue={itemData.workout_name}/>
                )}
                <input type="text" className="w-12 h-9 py-0.5 rounded-lg border border-black text-center" placeholder="10"/>
                <select name="time" id="time" className="w-24 pt-1 pb-1.5 ps-3 border border-black rounded-lg">
                    <option value="mins">mins</option>
                    <option value="mins">x</option>
                </select>
                <button onClick={() => {
                    props.deleteMenu(itemData.id);
                }} className="text-2xl ms-3">❌</button>
            </div>
        </>
    )
}