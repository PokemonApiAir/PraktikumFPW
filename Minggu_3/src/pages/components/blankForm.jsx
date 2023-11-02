import Education from './education';

export default function BlankForm({reset, register, handleSubmit, errors, inputStatus, setInputStatus, experiences, setExperiences, generate, statusChange, addField, deleteField, changeTitle, changePlace, changeDesc, changeStart, changeEnd}) {
    const handleClear = () => {
        reset({
            nama: "",
            title: "",
            phone_number: "",
            email: "",
            domicile: "",
            linkedin: "",
            photo_url: "",
            about: "",
            place_0: "",
            start_0: "",
            end_0: "",
            place_1: "",
            start_1: "",
            end_1: "",
            place_2: "",
            start_2: "",
            end_2: "",
            place_3: "",
            start_3: "",
            end_3: ""
        });

        setInputStatus([false, false, false, false])
    };

    return (
        <>
            <div className='w-full h-full flex flex-col justify-center items-center bg-hehe py-12 px-6'>
                <div className='w-full flex justify-center'>
                    <div className='w-full justify-start absolute ps-24'>
                        <button onClick={handleClear} className='text-white font-semibold absolute bg-button-cl rounded-lg h-12 w-32'>Clear</button>
                    </div>
                    <h1 className='text-3xl font-bold'>CV Maker</h1>
                </div>
                <form onSubmit={handleSubmit(generate)} className="w-full h-full flex flex-col justify-start items-center">
                    {/* Section Private Information */}
                    <div className="w-11/12 bg-white flex flex-col justify-center items-center rounded-lg mt-12 gap-y-5 py-10">
                        <div className='w-full flex justify-around h-16'>
                            <div className='w-1/2 flex flex-col mx-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("nama", {
                                    required: {
                                        value: true,
                                        message: "Nama wajib diisi"
                                    }
                                })} type="text" id="" placeholder='Nama'/>
                                <span className='text-red-600 h-4'>{errors?.nama?.message}</span>
                            </div>
                            <div  className='w-1/2 flex flex-col mx-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Title wajib diisi!!"
                                    }
                                })} type="text" id="" placeholder='Title'/>
                                <span className='text-red-600 h-4'>{errors?.title?.message}</span>
                            </div>
                        </div>
                        <div className='w-full flex justify-around h-16'>
                            <div className='w-1/2 flex flex-col mx-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("phone_number", {
                                    required: {
                                        value: true,
                                        message: "Phone number wajib diisi!!"
                                    },
                                    pattern: {
                                        value: /^[0-9]{10}$/, // Pola regex untuk nomor telepon 10 digit
                                        message: 'Format phone number salah'
                                    }
                                })} type="text" id=""  placeholder='Phone Number'/>
                                <span className='text-red-600 h-4'>{errors?.phone_number?.message}</span>
                            </div>
                            <div className='w-1/2 flex flex-col mx-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email wajib diisi"
                                    }
                                })} type="text" id=""  placeholder='Email'/>
                                <span className='text-red-600 h-4'>{errors?.email?.message}</span>
                            </div>
                        </div>
                        <div className='w-full flex justify-around h-16'>
                            <div className='w-1/2 flex flex-col mx-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("domicile", {
                                    required: {
                                        value: true,
                                        message: "Domosili wajib diisi"
                                    }
                                })} type="text" id=""  placeholder='Domicile'/>
                                <span className='text-red-600 h-4'>{errors?.domicile?.message}</span>
                            </div>
                            <div className='w-1/2 flex flex-col mx-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("linkedin", {
                                    required: {
                                        value: true,
                                        message: "Linkedin ID wajib diisi"
                                    }
                                })} type="text" id=""  placeholder='Linkedin ID'/>
                                <span className='text-red-600 h-4'>{errors?.linkedin?.message}</span>
                            </div>
                        </div>
                        <div className='w-full flex flex-col justify-around h-16'>
                            <div className='w-full flex flex-col px-12 h-full'>
                                <input className='border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' {...register("photo_url", {
                                    required: {
                                        value: true,
                                        message: "Photo URL wajib diisi"
                                    }
                                })} type="text" id=""  placeholder='Photo URL'/>
                                <span className='text-red-600 h-4'>{errors?.photo_url?.message}</span>
                            </div>
                        </div>
                    </div>
                    {/* Section About Myself */}
                    <div className="w-11/12 bg-white flex flex-col justify-center items-start rounded-lg mt-12 gap-y-2 py-10 px-12">
                        <p className='text-xl font-semibold'>About Myself</p>
                        <textarea className='border-4 border-black rounded-xl w-full text-xl' {...register("about", {
                            required: {
                                value: true,
                                message: "Aboout Myself wajib diisi"
                            },
                            validate: (value) => {
                                // Menghitung jumlah kata bukan huruf
                                const words = value.match(/\b\w+\b/g);
                                const wordCount = words ? words.length : 0;
                          
                                if (wordCount > 100) {
                                  return "Panjang tidak boleh lebih dari 100 kata";
                                }
                          
                                return true;
                            }
                        })} rows="6"></textarea>
                        <span className='text-red-600 h-4'>{errors?.about?.message}</span>
                    </div>
                    {/* Section Education */}
                    <Education register={register} inputStatus={inputStatus} statusChange={statusChange} errors={errors}/>
                    {/* Section Experience */}
                    <div className="w-11/12 bg-white flex flex-col justify-center items-start rounded-lg mt-12 gap-y-4 py-10 px-12">
                        <p className='text-xl font-semibold'>Experiences</p>
                        {experiences.map((item, idx) => (
                            <div key={Math.floor(Math.random() * 10000)} className='w-full flex flex-col gap-y-2'>
                                <div className='w-full flex h-16 gap-x-2 items-center'>
                                    <div className='w-1/2 flex flex-col h-full'>
                                        <input onChange={() => {
                                            changeTitle(item.id)
                                        }} className='title border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' defaultValue={item.title} type="text" placeholder='Title' {...register("experiences[" + item.id + "].title", {
                                            required: {
                                                value: true,
                                                message: "Experience title wajib diisi"
                                            }
                                        })}/>
                                        <span className='text-red-600 h-4'>{errors.experiences && errors.experiences[item.id] && errors.experiences[item.id].title?.message}</span>
                                    </div>
                                    <div className='w-1/2 flex flex-col h-full'>
                                        <input onChange={() => {
                                            changePlace(item.id)
                                        }} className='place border-4 border-gray-400 rounded-xl w-full h-12 ps-4 text-2xl' defaultValue={item.place} type="text" placeholder='Place' {...register("experiences[" + item.id + "].place", {
                                            required: {
                                                value: true,
                                                message: "Experience place wajib diisi"
                                            }
                                        })}/>
                                        <span className='text-red-600 h-4'>{errors.experiences && errors.experiences[item.id] && errors.experiences[item.id].place?.message}</span>
                                    </div>
                                    <button onClick={() => {
                                        deleteField(item.id)
                                    }} className="text-2xl ms-3">❌</button>
                                </div>
                                <div className='w-full flex gap-x-2 h-16'>
                                    <div className='w-8/12 flex flex-col h-full'>
                                        <input onChange={() => {
                                            changeDesc(item.id)
                                        }} className='desc border-4 border-gray-400 rounded-xl h-12 w-full ps-4 text-2xl' defaultValue={item.description} placeholder='Description' type="text" {...register("experiences[" + item.id + "].desc", {
                                            required: {
                                                value: true,
                                                message: "Experience description wajib diisi"
                                            }
                                        })}/>
                                        <span className='text-red-600 h-4'>{errors.experiences && errors.experiences[item.id] && errors.experiences[item.id].desc?.message}</span>
                                    </div>
                                    <div className='w-2/12 flex flex-col h-full'>
                                        <input onChange={() => {
                                            changeStart(item.id)
                                        }} className='start border-4 border-gray-400 rounded-xl h-12 w-full ps-4 text-2xl' defaultValue={item.start} placeholder='Start' type="text" {...register("experiences[" + item.id + "].start", {
                                            required: {
                                                value: true,
                                                message: "Experience tahun start wajib diisi"
                                            }
                                        })}/>
                                        <span className='text-red-600 h-4'>{errors.experiences && errors.experiences[item.id] && errors.experiences[item.id].start?.message}</span>
                                    </div>
                                    <div className='w-2/12 flex flex-col h-full'>
                                        <input onChange={() => {
                                            changeEnd(item.id)
                                        }} className='end border-4 border-gray-400 rounded-xl h-12 w-full ps-4 text-2xl' defaultValue={item.end} placeholder='End' type="text" {...register("experiences[" + item.id + "].end", {
                                            required: {
                                                value: true,
                                                message: "Experience tahun berakhir wajib diisi"
                                            }
                                        })}/>
                                        <span className='text-red-600 h-4'>{errors.experiences && errors.experiences[item.id] && errors.experiences[item.id].end?.message}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='w-full flex h-12 justify-end'>
                            <button onClick={addField} className='text-white font-semibold absolute bg-button-add rounded-lg h-12 w-32'>Add</button>
                        </div>
                    </div>
                    <div className="w-11/12 flex justify-center items-center my-12">
                        <button type="submit" className='text-white text-xl font-semibold bg-button-generate rounded-lg h-14 w-3/12'>Generate</button>
                    </div>
                </form>
            </div>
        </>
    )
}