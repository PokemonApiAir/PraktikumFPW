import { useState } from "react"
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi"
import { useLoaderData } from "react-router-dom";
import Joi from 'joi';

import handler from "../handler/handler";

export default function Profile() {
    const [confirmPassword, setConfirmPassword] = useState(false);
    const data = useLoaderData();

    const schema = Joi.object({
        first_name: Joi.string().required().messages({
            "string.empty":"First name tidak boleh kosong",
        }),
        last_name: Joi.string().required().messages({
            "string.empty":"Last name tidak boleh kosong",
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
        confirm_password: Joi.string().valid(Joi.ref('password')).messages({
            'any.only': 'Konfirmasi password tidak sama',
        })
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
        values: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password
        }
    });

    const openPassword = () => {
        setConfirmPassword(true);
    }

    const submit = async data => {
        await handler.updateProfile(data);
    }

    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <form onSubmit={handleSubmit(submit)} className="w-2/6 h-3/6 flex flex-col border border-black py-6 px-8 rounded-xl gap-y-6">
                    <h1 className="text-2xl font-semibold">Profile</h1>
                    <div className="w-full h-7 flex gap-x-6">
                        <div className="w-1/2 h-full">
                            <input type="text" placeholder={`${errors.first_name ? errors?.first_name?.message : "First Name"}`} className={`w-full h-full border border-black rounded ps-2 ${errors.first_name ? "placeholder-red-500" : ""}`} {...register("first_name")}/>
                        </div>
                        <div className="w-1/2 h-full">
                            <input type="text" placeholder={`${errors.last_name ? errors?.last_name?.message : "Last Name"}`} className={`w-full h-full border border-black rounded ps-2 ${errors.last_name ? "placeholder-red-500" : ""}`} {...register("last_name")}/>
                        </div>
                    </div>
                    <div className="w-full h-7 flex">
                        <input type="text" className={`w-full h-full border border-black rounded ps-2`} disabled {...register("email")}/>
                    </div>
                    <div className="w-full h-7 flex">
                        <input type="password" placeholder={`${errors.password ? errors?.password?.message : "Password"}`} disabled={`${confirmPassword ? "" : "disabled"}`} className={`w-full h-full border border-black rounded ps-2 ${errors.password ? "placeholder-red-500" : ""}`} {...register("password")}/>
                    </div>
                    <div className="w-full h-14 flex justify-end">
                        {confirmPassword && 
                            <div className="w-full h-full">
                                <input type="password" placeholder="Confirm Password" className={`w-full h-1/2 border border-black rounded ps-2`} {...register("confirm_password")}/>
                                <span className="w-full h-1/2 text-red-500">{errors?.confirm_password?.message}</span>
                            </div>
                        }
                        {!confirmPassword && <button onClick={openPassword} className="w-36 h-1/2 bg-gray-200 rounded hover:opacity-75">Change Password</button>}
                    </div>
                    <div className="w-full h-7 flex justify-center">
                        <button type="submit" className="w-36 h-full bg-gray-200 border border-black rounded hover:opacity-75">Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    )
}