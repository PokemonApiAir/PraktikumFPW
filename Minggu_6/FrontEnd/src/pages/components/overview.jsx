import { useLoaderData, Form } from "react-router-dom";
import { useForm } from 'react-hook-form';

export default function Overview() {
    const data = useLoaderData();

    const { register } = useForm({
        values: {
            judul: data?.judul
        }
    });

    return (
        <>
            <div className="w-full h-2/4 flex justify-center items-center">
                <div className="w-3/12 h-full flex flex-col border border-black rounded-lg px-8 pt-6">
                    <div className="w-full h-12 flex">
                        <Form action={`/home/stories/${data.id}/overview`} method="PATCH" className="w-1/2 h-full flex justify-start items-center gap-x-6">
                            <input type="text" className="text-lg font-semibold w-32 border border-black rounded ps-1.5" {...register("judul")}/>
                            <button className="w-12 h-1/2 rounded bg-gray-100 text-center" type="submit">Edit</button>
                        </Form>
                        <Form action={`/home/stories/${data.id}/overview`} method="DELETE" className="w-1/2 h-full flex justify-end items-center">
                            <button className="w-20 h-8 bg-gray-200 rounded-lg">Delete</button>
                        </Form>
                    </div>
                    <div className="w-full h-52">
                        <img className="w-full h-full pt-3" src={data.thumb} alt="" />
                    </div>
                    <Form action={`/home/stories/${data.id}/overview`} method="PUT" className="w-full h-16 mt-3 flex flex-col items-center gap-y-3">
                        <input type="url" className="w-11/12 h-1/2 border border-black rounded" {...register("thumb")}/>
                        <button className="w-4/12 bg-gray-200 rounded">Change Image</button>
                    </Form>
                </div>
            </div>
        </>
    )
}