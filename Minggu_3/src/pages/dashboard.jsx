import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi'

export default function Dashboard() {
    // Error Handling react-hook-form
    // const { register, handleSubmit,
    //     formState: { errors } } = useForm();

    // Schema harus diinisialisasi dulu
    const schema = Joi.object({
        name: Joi.string().min(10).max(20).required().messages({
            "string.empty": "Nama harus diisi",
            "string.min": "Minimal panjang karakter {#limit}",
            "string.max": "Maksimal panjang karakter {#limit}"
        }),
        usia: Joi.number().min(17).max(50).required().messages({
            "number.empty": "Usia harus diisi",
            "number.min": "Usia minimal {#limit}",
            "number.max": "Usia maksimal {#limit}"
        })
    })

    // Error Handling Joi resolvers
    const { register, handleSubmit,
        formState: { errors } } = useForm({
            resolver: joiResolver(schema)
        });

    const onSubmit = data => {
        console.log(data);
    }

    // Web Service
    // const schema = Joi.object({
    //     nama_key: Joi.string()
    // })

    return (
        <>
            <div className='w-screen h-screen flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="h-1/2 w-1/2 flex flex-col justify-center items-center gap-y-3">
                    <div className='flex justify-between w-48'>
                        <p>Nama</p>
                        <input className='border border-black rounded-lg px-3 w-32' type="text" placeholder='Name' {...register("name", {
                            minLength: {
                                value: 10,
                                message: "Minimal 10 Karakter"
                            },
                            maxLength: {
                                value: 20,
                                message: "Maksimal 20 Karakter"
                            },
                            required: {
                                value: true,
                                message: "Input harus diisi"
                            }
                        })}/>
                    </div>
                    <span className='text-red-600'>{errors?.name?.message}</span>
                    <div className='flex justify-between w-48'>
                        <p>Usia</p>
                        <input className='border border-black rounded-lg px-3 w-32' type="number" placeholder='Usia' {...register("usia")}/>
                    </div>
                    <span className='text-red-600'>{errors?.usia?.message}</span>
                    <div className='flex justify-between w-32'>
                        <input className='bg-black text-white py-0.5 px-2 rounded-lg' type="reset" value="Reset" />
                        <button className='bg-black text-white py-0.5 px-2 rounded-lg' type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}