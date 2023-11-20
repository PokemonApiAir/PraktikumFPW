import { useForm } from 'react-hook-form'
import { joiResolver } from "@hookform/resolvers/joi"
import { Link } from "react-router-dom";
import { useState } from 'react';
import Joi from 'joi';

import handler from '../handler/handler';

export default function Login() {
    const [isError, setIsError] = useState(false);
    const [response, setResponse] = useState();

    const schema = Joi.object({
        email: Joi.string().required().messages({
            "string.empty":"Email tidak boleh kosong",
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });

    const submit = async data => {
        const res = await handler.login(data);
        setResponse({...res});
        if(res.status >= 400 && res.status < 500){
            setIsError(true);
        }
    }

    return (
        <>
            {isError && response && 
            <div className='w-screen h-screen absolute flex justify-center items-center'>
                <div className='w-3/12 h-1/6 bg-white rounded-lg flex flex-col items-center'>
                    <button onClick={() => {
                        setIsError(false);
                    }} className='w-full text-lg text-end pe-2 pt-1'>✖️</button>
                    <p className='text-xl font-bold pt-3'>{response.status}</p>
                    <p className='text-red-500'>{response.message}</p>
                </div>
            </div>}
            <div className="min-w-screen h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit(submit)} className={`bg-gray-300 w-4/12 h-3/6 flex flex-col items-center justify-center rounded-lg`}>
                    <h1 className='text-3xl font-semibold mb-6'>Kisahku</h1>
                    <input type="text" placeholder={`${errors.email ? errors?.email?.message : "Email" }`} className={`w-4/6 text-lg font-light ps-2 rounded mt-6 ${errors.email ? "placeholder-red-500" : ""}`} {...register("email")}/>
                    <input type="password" placeholder={`${errors.password ? errors?.password?.message : "Password" }`} className={`w-4/6 text-lg font-light ps-2 rounded mt-6 ${errors.password ? "placeholder-red-500" : ""}`} {...register("password")}/>
                    <div className='w-4/6 flex justify-end mb-1 mt-8'>
                        <Link className='hover:opacity-50 text-sm' to={`/register`}>Don't have account?</Link>
                    </div>
                    <button type='submit' className='w-4/6 h-9 text-lg hover:text-white font-semibold hover:bg-blue-400 rounded text-slate-900 bg-blue-500'>Login</button>
                </form>
            </div>
        </>
    )
}