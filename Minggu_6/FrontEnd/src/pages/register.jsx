import { useForm } from 'react-hook-form'
import { joiResolver } from "@hookform/resolvers/joi"
import { Link } from "react-router-dom";
import Joi from 'joi';

import handler from "../handler/handler";

export default function Login() {
    const schema = Joi.object({
        email: Joi.string().required().messages({
            "string.empty":"Email tidak boleh kosong",
        }),
        first_name: Joi.string().required().messages({
            "string.empty":"First name tidak boleh kosong",
        }),
        last_name: Joi.string().required().messages({
            "string.empty":"Last name tidak boleh kosong",
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
        confirm_password: Joi.string().required().valid(Joi.ref('password')).messages({
            "any.only": "Confirm password tidak sama",
        }),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    });

    if(Object.keys(errors).confirm_password){
        setError('confirm_password', {
            type: 'manual',
            message: 'Confirm password tidak sama',
        });
    }

    const submit = async data => {
        await handler.register(data);
    }

    return (
        <>
            <div className="min-w-screen h-screen flex justify-center items-center">
                <form onSubmit={handleSubmit(submit)} className='bg-gray-300 w-4/12 h-3/6 flex flex-col items-center justify-center rounded-lg'>
                    <h1 className='text-3xl font-semibold pb-8'>Kisahku</h1>
                    <input type="text" placeholder={`${errors.email ? errors?.email?.message : "Email" }`} className={`w-4/6 text-lg font-light ps-2 rounded mt-3 ${errors.email ? "placeholder-red-500" : ""}`} {...register("email")}/>
                    <input type="text" placeholder={`${errors.first_name ? errors?.first_name?.message : "First Name" }`} className={`w-4/6 text-lg font-light ps-2 rounded mt-3 ${errors.first_name ? "placeholder-red-500" : ""}`} {...register("first_name")}/>
                    <input type="text" placeholder={`${errors.last_name ? errors?.last_name?.message : "Last Name" }`} className={`w-4/6 text-lg font-light ps-2 rounded mt-3 ${errors.last_name ? "placeholder-red-500" : ""}`} {...register("last_name")}/>
                    <input type="password" placeholder={`${errors.password ? errors?.password?.message : "Password" }`} className={`w-4/6 text-lg font-light ps-2 rounded mt-3 ${errors.password ? "placeholder-red-500" : ""}`} {...register("password")}/>
                    <input type="password" placeholder="Confirm password" className={`w-4/6 text-lg font-light ps-2 rounded mt-3`} {...register("confirm_password")}/>
                    <div className='w-4/6 h-4 flex justify-start mt-1'>
                        <span className='text-red-500 text-sm'>{errors?.confirm_password?.message}</span>
                    </div>
                    <div className='w-4/6 flex justify-end mt-3'>
                        <Link className='hover:opacity-50 text-sm' to={`/login`}>Already have account?</Link>
                    </div>
                    <button type='submit' className='w-4/6 h-9 text-lg hover:text-white font-semibold hover:bg-blue-400 mt-1 rounded text-slate-900 bg-blue-500'>Register</button>
                </form>
            </div>
        </>
    )
}