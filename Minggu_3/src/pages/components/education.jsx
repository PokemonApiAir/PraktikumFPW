export default function Education({data, register, inputStatus, statusChange, errors, }) {
    return (
        <>
            <div className="w-11/12 bg-white flex flex-col justify-center items-start rounded-lg mt-12 gap-y-2 py-10 px-12">
                <p className='text-xl font-semibold'>Education</p>
                {/* High School */}
                <div className='w-full flex flex-col items-start gap-y-2 pb-3'>
                    {inputStatus[0]? (
                        <div className='flex items-center'>
                            <input checked onChange={() => {statusChange(0)}} className='w-4 h-4 me-3' type="checkbox" id="high-school" name="high-school" value="High School"/><label className='text-xl font-normal' htmlFor="high-school">High School</label>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <input onChange={() => {statusChange(0)}} className='w-4 h-4 me-3' type="checkbox" id="high-school" name="high-school" value="High School"/><label className='text-xl font-normal' htmlFor="high-school">High School</label>
                        </div>
                    )}
                    {inputStatus[0] ? (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="" className='text-0 border border-black rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_0", {
                                    required: {
                                        value: inputStatus[0] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[0] ? errors?.place_0?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="" className='text-0 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_0", {
                                    required: {
                                        value: inputStatus[0] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[0] ? errors?.start_0?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="" className='text-0 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_0", {
                                    required: {
                                        value: inputStatus[0] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[0] ? errors?.end_0?.message : null}</span>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="disabled" className='text-0 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_0", {
                                    required: {
                                        value: inputStatus[0] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[0] ? errors?.place_0?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="disabled" className='text-0 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_0", {
                                    required: {
                                        value: inputStatus[0] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[0] ? errors?.start_0?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="disabled" className='text-0 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_0", {
                                    required: {
                                        value: inputStatus[0] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[0] ? errors?.end_0?.message : null}</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Diploma Degree */}
                <div className='w-full flex flex-col items-start gap-y-2 pb-3'>
                    {inputStatus[1] ? (
                        <div className='flex items-center'>
                            <input checked onChange={() => {statusChange(1)}} className='w-4 h-4 me-3' type="checkbox" id="diploma-degree" name="diploma-degree" value="Diploma Degree (D3)"/><label className='text-xl font-normal' htmlFor="diploma-degree">Diploma Degree (D3)</label>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <input onChange={() => {statusChange(1)}} className='w-4 h-4 me-3' type="checkbox" id="diploma-degree" name="diploma-degree" value="Diploma Degree (D3)"/><label className='text-xl font-normal' htmlFor="diploma-degree">Diploma Degree (D3)</label>
                        </div>
                    )}
                    {inputStatus[1] ? (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="" className='text-1 border border-black rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_1", {
                                    required: {
                                        value: inputStatus[1] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[1] ? errors?.place_1?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="" className='text-1 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_1", {
                                    required: {
                                        value: inputStatus[1] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[1] ? errors?.start_1?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="" className='text-1 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_1", {
                                    required: {
                                        value: inputStatus[1] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[1] ? errors?.end_1?.message : null}</span>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="disabled" className='text-1 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_1", {
                                    required: {
                                        value: inputStatus[1] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[1] ? errors?.place_1?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="disabled" className='text-1 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_1", {
                                    required: {
                                        value: inputStatus[1] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[1] ? errors?.start_1?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="disabled" className='text-1 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_1", {
                                    required: {
                                        value: inputStatus[1] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[1] ? errors?.end_1?.message : null}</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Bachelor Degree */}
                <div className='w-full flex flex-col items-start gap-y-2 pb-3'>
                    {inputStatus[2] ? (
                        <div className='flex items-center'>
                            <input checked onChange={() => {statusChange(2)}} className='w-4 h-4 me-3' type="checkbox" id="high-school" name="bachelor-degree" value="Bachelor Degree (S1)"/><label className='text-xl font-normal' htmlFor="bachelor-degree">Bachelor Degree (S1)</label>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <input onChange={() => {statusChange(2)}} className='w-4 h-4 me-3' type="checkbox" id="high-school" name="bachelor-degree" value="Bachelor Degree (S1)"/><label className='text-xl font-normal' htmlFor="bachelor-degree">Bachelor Degree (S1)</label>
                        </div>
                    )}
                    {inputStatus[2] ? (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="" className='text-2 border border-black rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_2", {
                                    required: {
                                        value: inputStatus[2] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[2] ? errors?.place_2?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="" className='text-2 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_2", {
                                    required: {
                                        value: inputStatus[2] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[2] ? errors?.start_2?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="" className='text-2 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_2", {
                                    required: {
                                        value: inputStatus[2] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[2] ? errors?.end_2?.message : null}</span>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="disabled" className='text-2 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_2", {
                                    required: {
                                        value: inputStatus[2] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[2] ? errors?.place_2?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="disabled" className='text-2 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_2", {
                                    required: {
                                        value: inputStatus[2] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[2] ? errors?.start_2?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="disabled" className='text-2 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_2", {
                                    required: {
                                        value: inputStatus[2] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[2] ? errors?.end_2?.message : null}</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Master Degree */}
                <div className='w-full flex flex-col items-start gap-y-2 pb-3'>
                    {inputStatus[3] ? (
                        <div className='flex items-center'>
                            <input checked onChange={() => {statusChange(3)}} className='w-4 h-4 me-3' type="checkbox" id="high-school" name="master-degree" value="Master Degree (S2)"/><label className='text-xl font-normal' htmlFor="master-degree">Master Degree (S2)</label>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <input onChange={() => {statusChange(3)}} className='w-4 h-4 me-3' type="checkbox" id="high-school" name="master-degree" value="Master Degree (S2)"/><label className='text-xl font-normal' htmlFor="master-degree">Master Degree (S2)</label>
                        </div>
                    )}
                    {inputStatus[3] ? (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="" className='text-3 border border-black rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_3", {
                                    required: {
                                        value: inputStatus[3] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[3] ? errors?.place_3?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="" className='text-3 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_3", {
                                    required: {
                                        value: inputStatus[3] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[3] ? errors?.start_3?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="" className='text-3 border border-black rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_3", {
                                    required: {
                                        value: inputStatus[3] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[3] ? errors?.end_3?.message : null}</span>
                            </div>
                        </div>
                    ) : (
                        <div className='w-full flex justify-center items-center h-16 gap-x-6'>
                            <div className="h-full w-8/12 flex flex-col">
                                <input disabled="disabled" className='text-3 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' {...register("place_3", {
                                    required: {
                                        value: inputStatus[3] ? true : false,
                                        message: "Field Highschool wajib diisi"
                                    }
                                })} placeholder='Place' type="text"/>
                                <span className='text-red-600 h-4'>{inputStatus[3] ? errors?.place_3?.message : null}</span>
                            </div>
                            <div className="h-full w-2/12 flex flex-col">
                                <input disabled="disabled" className='text-3 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='Start' type="text" {...register("start_3", {
                                    required: {
                                        value: inputStatus[3] ? true : false,
                                        message: "Field Start wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[3] ? errors?.start_3?.message : null}</span>
                            </div>
                            <div className='h-full w-2/12 flex flex-col'>
                                <input disabled="disabled" className='text-3 border border-gray-300 rounded-xl h-12 w-full ps-4 text-2xl' placeholder='End' type="text" {...register("end_3", {
                                    required: {
                                        value: inputStatus[3] ? true : false,
                                        message: "Field End wajib diisi"
                                    }
                                })}/>
                                <span className='text-red-600 h-4'>{inputStatus[3] ? errors?.end_3?.message : null}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}