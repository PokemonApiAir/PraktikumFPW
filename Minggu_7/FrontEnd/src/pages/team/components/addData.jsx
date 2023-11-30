import { useForm } from 'react-hook-form'; 
import { Form } from 'react-router-dom';

import handlerTeam from '../../../handler/handlerTeam';

export default function EditData() {
    const {register, handleSubmit, reset, formState: { errors }} = useForm()

    const createTeam = data => {
        handlerTeam.formActionCreate(data);
    }

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className='text-5xl font-bold mt-24'>Add Team</h1>
                <form onSubmit={handleSubmit(createTeam)} className="w-2/6 h-96 bg-gray-200 flex flex-col items-center px-12 mt-24 rounded-xl">
                    <div className='w-full h-80 flex'>
                        <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                            <label>Name</label>
                            <label>Coach</label>
                        </div>
                        <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                            <input type="text" className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("name")}/>
                            <input type="text" className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("coach")}/>
                        </div>
                    </div>
                    <button className='w-1/2 h-10 bg-white text-black text-xl rounded-3xl hover:bg-black hover:text-white'>Save</button>
                </form>
            </div>
        </>
    )
}