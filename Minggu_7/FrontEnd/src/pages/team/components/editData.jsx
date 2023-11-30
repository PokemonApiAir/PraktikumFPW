import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { useLoaderData, Form } from 'react-router-dom';
import axios from 'axios';

const api_url = "http://localhost:3000/api";
import handlerTeam from '../../../handler/handlerTeam';

export default function EditData() {
    const [isLoading, setIsLoading] = useState(true);
    const [playerData, setPlayerData] = useState([]);
    const [comboboxData, setComboboxData] = useState([]);

    const [addActive, setAddActive] = useState(false);

    const data = useLoaderData()

    const {register, handleSubmit, reset, formState: { errors }} = useForm({
        defaultValues: {
            name: data.name,
            coach: data.coach,
            position: data.position,
            nationality: data.nationality,
            number: data.number
        }
    })

    const fetch = async() => {
        try {
            setIsLoading(true);
            setPlayerData([]);
    
            const playerPromises = data.players.map(async (element) => {
                const response = await axios.get(`${api_url}/player/get-player-by-id`, {
                    params: {
                        id: element
                    }
                });
                return response.data;
            });
    
            const newPlayerData = await Promise.all(playerPromises);
            setPlayerData([...newPlayerData]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchPlayer = async() => {
        const response = await axios.get(`${api_url}/player/get-unassigned-player`);
        setComboboxData(response.data);
    }

    const deletePlayer = (id_player) => {
        const delete_data = {
            id: data._id,
            id_player: id_player
        }

        handlerTeam.formActionDelete(delete_data);
    }

    useEffect(() => {
        fetchPlayer();
    }, [])

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className='text-5xl font-bold mt-12'>Edit Team</h1>
                <div className='w-full flex justify-evenly items-center px-16'>
                    <Form action={`/team/edit/${data._id}`} method="PUT" className="w-2/6 h-96 bg-gray-200 flex flex-col items-center px-24 mt-12 rounded-xl">
                        <div className='w-full h-80 flex'>
                            <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                                <label>Name</label>
                                <label>Coach</label>
                                <label>Record</label>
                            </div>
                            <div action={`edit/${data._id}`} method='PUT' className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                                <input type="text" className="w-full h-8 border border-gray-500 rounded-lg px-2" readOnly {...register("name")}/>
                                <input type="text" className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("coach")}/>
                                <div className='w-full h-8 flex justify-around'>
                                    <label>Win : {data.record.win}</label>
                                    <label>Draw : {data.record.draw}</label>
                                    <label>Lose : {data.record.lose}</label>
                                </div>
                            </div>
                        </div>
                        <button className='w-1/2 h-10 bg-white text-black text-xl rounded-3xl hover:bg-black hover:text-white'>Save</button>
                    </Form>
                    <div className='w-3/6 h-160 bg-gray-200 flex flex-col items-center mt-12 rounded-xl text-xl overflow-y-auto'>
                        <div className="w-full bg-black text-white flex justify-around px-12 py-4">
                            <label className='w-4/12 text-center'>Nama</label>
                            <label className='w-3/12 text-center'>Position</label>
                            <label className='w-3/12 text-center'>Nationality</label>
                            <label className='w-2/12 text-center'>Action</label>
                        </div>
                        <div className="w-full flex justify-center px-12 py-4 border-b-2 border-black">
                            {!addActive ? (
                                <button onClick={() => setAddActive(true)}>+ Add Player</button>
                            ) : (
                                <Form action={`/team/edit/${data._id}`} method="POST" className='w-full h-8 flex justify-around'>
                                    <select className='w-1/4 border border-black rounded-3xl px-4 pb-1' {...register("add_player")}>
                                        {comboboxData.map((item, idx) => (
                                            <option key={idx} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <button className='w-1/4 border border-slate-400 bg-black text-white rounded-3xl pb-1 hover:opacity-75'>Save</button>
                                </Form>
                            )}
                        </div>
                        {isLoading ? (
                            <div className='w-full h-96 flex justify-center items-center mt-16'>
                                <p className='text-3xl'>Loading...</p>
                            </div>
                        ) : (
                            playerData.map((item, idx) => (
                                <div key={idx} className='w-full h-10 flex flex-col px-12 pb-2 mt-2 border-b-2 border-black'>
                                    <div className='w-full h-full flex justify-around items-center py-4'>
                                        <label className='w-4/12 text-start'>{item.name}</label>
                                        <label className='w-3/12 text-center'>{item.position}</label>
                                        <label className='w-3/12 text-center'>{item.nationality}</label>
                                        <button className='w-2/12 text-center hover:opacity-75' onClick={() => deletePlayer(item._id)}>❌</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}