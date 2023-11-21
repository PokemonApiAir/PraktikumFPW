import { joiResolver } from "@hookform/resolvers/joi"
import { Form } from "react-router-dom"
import { useForm } from "react-hook-form";
import Joi from 'joi';

export default function NewChara() {

    const schema = Joi.object({
        email: Joi.string().required().messages({
            "string.empty":"Email tidak boleh kosong",
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
    });

    return (
        <>
            <Form action="" method="POST" className="w-full h-full px-8 py-6 flex flex-col gap-y-4">
                <div className="w-full h-8 flex mb-8">
                    <div className="w-1/2 h-full flex items-center">
                        <h1 className="text-2xl font-bold">Detail</h1>
                    </div>
                    <div className="w-1/2 h-full flex justify-end gap-x-4">
                        <button type="submit" className="w-5/12 bg-gray-200 rounded-lg hover:opacity-75">Save</button>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-5">
                    <input type="text" className="w-full h-8 border border-black rounded-lg ps-2" {...register("nama")} placeholder="Nama"/>
                    <input type="text" className="w-full h-8 border border-black rounded-lg ps-2" {...register("umur")} placeholder="Umur"/>
                    <div className="flex justify-start items-center">
                        <div className="flex justify-start items-center gap-x-2">
                            <input type="radio" id="MC" name="peran" value="MC" className="w-3 h-3 mt-1" {...register("peran", { value: "MC" })}/><label htmlFor="MC">Main Character</label>
                        </div>
                        <div className="flex justify-start items-center gap-x-2">
                            <input type="radio" id="NPC" name="peran" value="NPC" className="w-3 h-3 mt-1 ms-4" {...register("peran", { value: "NPC" })}/><label htmlFor="NPC">Side Character</label>
                        </div>
                    </div>
                    <textarea className="w-full h-24 border border-black rounded-lg ps-2" {...register("sifat")} placeholder="Sifat"/>
                    <textarea className="w-full h-24 border border-black rounded-lg ps-2" {...register("backstory")} placeholder="Backstory"/>
                </div>
            </Form>
        </>
    )
}