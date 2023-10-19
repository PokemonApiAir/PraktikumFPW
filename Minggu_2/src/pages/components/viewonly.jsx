export default function Viewonly(props) {
    const item = props.item
    return (
        <>
            <div className="w-full h-10 rounded-full border border-black flex justify-between items-center px-6">
                <p className="w-1/2">{item.set} Set {item.workout_name}</p>
                <p className="2-1/2">{item.long}{item.time}</p>
            </div>
        </>
    )
}