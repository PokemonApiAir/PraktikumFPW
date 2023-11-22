import { useLoaderData, Link, Form } from "react-router-dom"

export default function StoryDefault() {
    const data = useLoaderData();

    return (
        <>
            <div className="w-full h-full pt-12 px-16 flex justify-center">
                <div className="w-4/6 grid grid-cols-3 gap-x-12 gap-y-6">
                    {data.map(item => (
                        <Link key={item.id} className="w-full h-72 border border-black rounded-xl" to={`${item.id}/overview`}>
                            <div className="w-full h-1/2 my-4 px-6">
                                <img className="h-full w-full rounded-xl" src={item.thumb} alt="" />
                            </div>
                            <div className="w-full h-1/2 px-6 pt-6">
                                <p className="text-lg font-semibold">{item.judul}</p>
                            </div>
                        </Link>
                    ))}
                    <Form action="/home/stories" method="POST">
                        <button type="submit" className="w-full h-72 border border-black rounded-xl flex flex-col justify-center items-center gap-y-3 bg-gray-100">
                            <h1 className="text-3xl opacity-50">➕</h1>
                            <h1 className="text-2xl text-gray-400">Add New Story</h1>
                        </button>
                    </Form>
                </div>
            </div>
        </>
    )
}