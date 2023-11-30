import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; 
import axios from 'axios';
import { Form, useLoaderData } from 'react-router-dom';

import handlerMatch from '../../../handler/handlerMatch';

const api_url = "http://localhost:3000/api"

export default function EditData() {
    const {register, handleSubmit, reset, getValues, formState: { errors }} = useForm({
        defaultValues: {
            home: "b970a8016a60fd877c1e86b9",
            away: "d02c269c03952151600c3570"
        }
    })
    const [saveButton, setSaveButton] = useState(false);
    const [count, setCount] = useState(0);
    const [log, setLog] = useState([]);

    const [team, setTeam] = useState([]);

    const data = useLoaderData();

    const addLog = () => {
        if(saveButton){
            return alert("Save dulu lognya");
        }
        const blank_log = {
            event: "",
            team: "",
            player: "",
        }

        setLog([...log, blank_log]);
        setCount(count + 1);
        setSaveButton(true);
    }

    const save = data => {
        console.log(data);
    }

    const saveButtonClick = data => {
        log[data.index].event = data.event;
        log[data.index].team = data.team;
        log[data.index].team_name = data.team;
        log[data.index].player = data.player;
        setLog([...log]);
        setSaveButton(false);
    }

    const changeTeam = async() => {
        const away = getValues('away');
        const home = getValues('home');

        const team_away = await axios.get(`${api_url}/team/get-team-by-id`, {
            params: {
                id: away
            }
        })
        const team_home = await axios.get(`${api_url}/team/get-team-by-id`, {
            params: {
                id: home
            }
        })

        setTeam([team_away.data, team_home.data]);
    }

    useEffect(() => {
        changeTeam();
    }, [])

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className='text-5xl font-bold mt-24'>Add Match</h1>
                <div className='w-full h-full flex justify-center items-center mt-12'>
                    <form onSubmit={handleSubmit(save)} className="w-2/6 h-96 flex justify-center items-center gap-x-24 pe-24">
                        <div className='w-full h-full flex flex-col items-center bg-gray-200 px-12 rounded-xl'>
                            <div className='w-full h-80 flex'>
                                <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                                    <label>Home</label>
                                    <label>Away</label>
                                    <label>Match Time</label>
                                    <label>Round</label>
                                </div>
                                <div className="w-1/2 h-full flex flex-col justify-evenly items-start text-lg">
                                    <select  className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("home")} onChange={changeTeam}>
                                        {data.map((item, idx) => (
                                            <option key={idx} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <select  className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("away")} onChange={changeTeam}>
                                        {data.map((item, idx) => (
                                            <option key={idx} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                    <input type="datetime-local" className="w-full h-8 border border-gray-500 rounded-lg px-2 pb-1" {...register("match_time")}/>
                                    <select  className="w-full h-8 border border-gray-500 rounded-lg px-2" {...register("round")}>
                                        <option value="preliminary">Preliminary</option>
                                        <option value="Semifinal">semifinal</option>
                                        <option value="final">Final</option>
                                    </select>
                                </div>
                            </div>
                            <button type='submit' className='w-1/2 h-10 bg-white text-black text-xl rounded-3xl hover:bg-black hover:text-white'>Save</button>
                        </div>
                    </form>
                    <div className='w-3/6 h-160 flex flex-col items-center bg-gray-200 py-6 rounded-xl'>
                        <h1 className='text-4xl font-semibold'>Logs</h1>
                        <div className='w-full flex flex-col'>
                            <div className='w-full h-12 flex justify-around items-center text-center text-white text-xl bg-black px-12 mt-6'>
                                <label className='w-1/3'>Event</label>
                                <label className='w-1/3'>Team</label>
                                <label className='w-1/3'>Player</label>
                            </div>
                            {log.map((item, idx) => (
                                saveButton && count === (idx + 1) ? (
                                    <form onSubmit={handleSubmit(saveButtonClick)} key={idx} className='w-full h-24 flex flex-col justify-around items-center gap-x-4 border-b-2 border-black text-center text-xl px-12'>
                                        <div className='w-full h-1/2 flex items-center gap-x-4'>
                                            <input type="hidden" {...register("index", { value : idx })}/>
                                            <select className='w-1/3 border border-black rounded-xl px-2' {...register("event")}>
                                                <option value="goal">Goal</option>
                                                <option value="yellow card">Yellow Card</option>
                                                <option value="red card">Red Card</option>
                                            </select>
                                            <select className='w-1/3 border border-black rounded-xl px-2' {...register("team")}>
                                                {console.log(team)}
                                                {team.map((item, idx) => (
                                                    <option value={item._id}>{item.name}</option>
                                                ))}
                                            </select>
                                            <select className='w-1/3 border border-black rounded-xl px-2' {...register("player")}>

                                            </select>
                                        </div>
                                        <button className="w-full h-1/2">Save</button>
                                    </form>
                                ) : (
                                    <div key={idx} className='w-full h-12 flex justify-around items-center gap-x-4 border-b-2 border-black text-center text-xl px-12'>
                                        <p className='w-1/3 rounded-xl text-center'>{item.event}</p>
                                        <p className='w-1/3 rounded-xl text-center'>{item.team}</p>
                                        <p className='w-1/3 rounded-xl text-center'>{item.player}</p>
                                    </div>
                                )
                            ))}
                            <div className='w-full h-12 flex justify-around items-center text-center text-2xl px-12'>
                                <button className='h-full' onClick={addLog}>+ Add Log</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}