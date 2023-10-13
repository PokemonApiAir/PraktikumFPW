export default function Handle(props) {
    const click = () => {
        if(props.data == "Tes"){
            return props.setData("Yoi");
        }
        return props.setData("Tes");
    }

    return (
        <>
            <button onClick={click}>Click</button>
        </>
    )
}