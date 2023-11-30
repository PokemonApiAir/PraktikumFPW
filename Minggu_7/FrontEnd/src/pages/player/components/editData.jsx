import { useForm } from 'react-hook-form'; 
import { useLoaderData, Form } from 'react-router-dom';

export default function EditData() {
    const data = useLoaderData()
    
    const {register, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            name: data.name,
            age: data.age,
            position: data.position,
            nationality: data.nationality,
            number: data.number
        }
    })

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className='text-5xl font-bold mt-24'>Edit Player</h1>
                <Form action={`/player/edit/${data._id}`} method="PUT" className="w-2/6 h-96 bg-gray-200 flex flex-col items-center px-12 mt-24 rounded-xl">
                    <div className='w-full h-80 flex'>
                        <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                            <label>Name</label>
                            <label>Age</label>
                            <label>Position</label>
                            <label>Nationality</label>
                            <label>Number</label>
                        </div>
                        <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                            <input type="text" className="w-full h-8 border border-gray-500 rounded-lg px-2" readOnly {...register("name")}/>
                            <input type="number" className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("age")}/>
                            <select  className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("position")}>
                                <option value="Forward">Forward</option>
                                <option value="Goalkeeper">Goalkeeper</option>
                                <option value="Defender">Defender</option>
                                <option value="Midfielder">Midfielder</option>
                            </select>
                            <input type="text" className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("nationality")}/>
                            <input type="number" className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("number")}/>
                        </div>
                    </div>
                    <button className='w-1/2 h-10 bg-white text-black text-xl rounded-3xl hover:bg-black hover:text-white'>Save</button>
                </Form>
            </div>
        </>
    )
}