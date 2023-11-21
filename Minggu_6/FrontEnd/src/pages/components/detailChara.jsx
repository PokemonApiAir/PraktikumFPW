import { joiResolver } from "@hookform/resolvers/joi"
import { useLoaderData } from "react-router-dom"
import { useForm } from "react-hook-form";
import Joi from 'joi';

import handler from '../../handler/handler';

export default function DetailChara() {
    const data = useLoaderData();

    const schema = Joi.object({
        email: Joi.string().required().messages({
            "string.empty":"Email tidak boleh kosong",
        }),
        password: Joi.string().required().messages({
            "string.empty":"Password tidak boleh kosong",
        }),
    })

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
        defaultValues: {
            nama: data?.nama,
            umur: data?.umur,
            sifat: data?.sifat,
            backstory: data?.backstory,
            peran: data?.peran
        }
    });

    const handleDeleteClick = async () => {
        const dataForm = {};
        dataForm.id = data.id;
        dataForm.id_chara = data.id_chara;
        await handler.deleteChara(dataForm);
    };

    const handleSaveClick = async () => {
        const formData = getValues();
        formData.id = data.id;
        formData.id_chara = data.id_chara;
        await handler.saveChara(formData);
    };

    return (
        <>
            <div className="w-full h-full px-8 py-6 flex flex-col gap-y-4">
                <div className="w-full h-8 flex mb-8">
                    <div className="w-1/2 h-full flex items-center">
                        <h1 className="text-2xl font-bold">Detail</h1>
                    </div>
                    <div className="w-1/2 h-full flex justify-end gap-x-4">
                        <div className="w-5/12 h-full">
                            <button className="w-full h-full bg-gray-200 rounded-lg hover:opacity-75" onClick={handleDeleteClick}>Delete</button>
                        </div>
                        <div className="w-5/12 h-full">
                            <button type="submit" className="w-full h-full bg-gray-200 rounded-lg hover:opacity-75" onClick={handleSaveClick}>Save</button>
                        </div>
                    </div>
                </div>
                <form className="w-full flex flex-col gap-y-5">
                    <input type="text" className="w-full h-8 border border-black rounded-lg ps-2" {...register("nama")}/>
                    <input type="text" className="w-full h-8 border border-black rounded-lg ps-2" {...register("umur")}/>
                    <div className="flex justify-start items-center">
                        <div className="flex justify-start items-center gap-x-2">
                            <input type="radio" id="MC" name="peran" value="MC" className="w-3 h-3 mt-1" {...register("peran", { value: "MC" })}/><label htmlFor="MC">Main Character</label>
                        </div>
                        <div className="flex justify-start items-center gap-x-2">
                            <input type="radio" id="NPC" name="peran" value="NPC" className="w-3 h-3 mt-1 ms-4" {...register("peran", { value: "NPC" })}/><label htmlFor="NPC">Side Character</label>
                        </div>
                    </div>
                    <textarea className="w-full h-24 border border-black rounded-lg ps-2" {...register("sifat")}/>
                    <textarea className="w-full h-24 border border-black rounded-lg ps-2" {...register("backstory")}/>
                </form>
            </div>
        </>
    )
}