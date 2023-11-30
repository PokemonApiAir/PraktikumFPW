import { useForm } from "react-hook-form";
import { Link, Form } from "react-router-dom";

export default function ListPlayer({data}) {
    const { register } = useForm();
    return (
        <>
            <div className="w-full h-12 flex justify-around items-center text-lg gap-x-4 px-12">
                <h1 className="w-3/12 text-start">{data.name}</h1>
                <h1 className="w-1/12 text-center">{data.age}</h1>
                <h1 className="w-2/12 text-center">{data.position}</h1>
                <h1 className="w-2/12 text-center">{data.nationality}</h1>
                <h1 className="w-2/12 text-center">{data.number}</h1>
                <div className="w-2/12 h-8 text-center flex">
                    <Link className="w-1/2 h-full bg-gray-200 rounded-l hover:opacity-75 pt-0.5" to={`/player/edit/${data._id}`}>Edit</Link>
                    <Form action={`/player/home`} method="DELETE" className="w-1/2 h-full bg-red-500 rounded-r hover:opacity-75">
                        <input type="hidden" value={data._id} {...register('id')}/>
                        <button className="w-full h-full">Delete</button>
                    </Form>
                </div>
            </div>
        </>
    )
}