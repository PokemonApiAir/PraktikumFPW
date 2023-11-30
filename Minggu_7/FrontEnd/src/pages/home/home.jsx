import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"

const api_url = "http://localhost:3000/api";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [teamHome, setTeamHome] = useState();
    const [teamAway, setTeamAway] = useState();
    const data = useLoaderData();
    console.log(data);
    const fetch = async() => {
        setIsLoading(true);
        const home = await axios.get(`${api_url}/team/get-team-by-id`, {
            params: {
                id: data.match.team_home
            }
        })
        const away = await axios.get(`${api_url}/team/get-team-by-id`, {
            params: {
                id: data.match.team_away
            }
        })
        setTeamHome(home.data);
        setTeamAway(away.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <>
            <div className="w-full h-5/6">
                {!isLoading ? (
                    <div className="w-full h-full flex flex-col items-center gap-y-12">
                        <h1 className="text-5xl font-bold mt-12">Last Match</h1>
                        <div className="w-2/6 h-96 flex flex-col justify-center items-center">
                            <div className="w-full h-full flex justify-center items-center mt-8">
                                <div className="w-5/12 h-full flex flex-col justify-center items-center text-black bg-vs rounded-3xl gap-y-3 border-2 border-black drop-shadow-2xl -rotate-6">
                                    <h1 className="text-3xl font-medium">{teamHome ? teamHome.name : ""}</h1>
                                    <h1 className="text-xl">Score : {data.match.score_home}</h1>
                                </div>
                                <h1 className="w-2/12 text-3xl text-center">VS</h1>
                                <div className="w-5/12 h-full flex flex-col justify-center items-center text-black bg-vs rounded-3xl gap-y-3 border-2 border-black drop-shadow-2xl rotate-6">
                                    <h1 className="text-3xl font-medium">{teamAway ? teamAway.name : ""}</h1>
                                    <h1 className="text-xl">Score : {data.match.score_away}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex mt-12">
                            <div className="w-1/2 flex flex-col justify-center items-center gap-y-12">
                                <h1 className="text-5xl font-bold">Top 3 Player</h1>
                                <div className="w-full h-96 flex me-12 mt-12">
                                    <div className="w-72 h-full relative">
                                        <div className="w-full h-full flex flex-col justify-center items-center bg-cyan-500 border border-black rounded-3xl mt-48 ms-24 py-12 drop-shadow-2xl absolute">
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.player[2].name}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">{data.player[2].number}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">{data.player[2].nationality}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Goal : {data.player[2].totalGoal}</h1>
                                        </div>
                                    </div>
                                    <div className="w-72 h-full relative">
                                        <div className="w-full h-full flex flex-col justify-center items-center bg-cyan-400 border border-black rounded-3xl mt-24 ms-12 py-12 drop-shadow-2xl absolute">
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.player[1].name}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">{data.player[1].number}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">{data.player[1].nationality}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Goal : {data.player[1].totalGoal}</h1>
                                        </div>
                                    </div>
                                    <div className="w-72 h-full relative pe-12">
                                        <div className="w-full h-full flex flex-col justify-center items-center bg-cyan-300 border border-black rounded-3xl py-12 drop-shadow-2xl absolute">
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.player[0].name}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">{data.player[0].number}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">{data.player[0].nationality}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Goal : {data.player[0].totalGoal}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-center gap-y-12">
                                <h1 className="text-5xl font-bold">Top 3 Team</h1>
                                <div className="w-full h-96 flex me-12 mt-12">
                                    <div className="w-72 h-full relative">
                                        <div className="w-full h-full flex flex-col justify-center items-center border bg-green-300 border-black z-20 rounded-3xl ms-24 py-12 drop-shadow-2xl absolute">
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.team[0].name}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.team[0].coach}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Point: {data.team[0].points}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Win : {data.team[0].record.win}</h1>
                                        </div>
                                    </div>
                                    <div className="w-72 h-full relative">
                                        <div className="w-full h-full flex flex-col justify-center items-center border bg-green-400 border-black z-10 rounded-3xl mt-24 ms-12 py-12 drop-shadow-2xl absolute">
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.team[1].name}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.team[1].coach}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Point: {data.team[1].points}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Win : {data.team[1].record.win}</h1>
                                        </div>
                                    </div>
                                    <div className="w-72 h-full relative pe-12">
                                        <div className="w-full h-full flex flex-col justify-center items-center bg-green-500 border border-black z-0 rounded-3xl mt-48 py-12 drop-shadow-2xl absolute">
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.team[2].name}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center text-center">{data.team[2].coach}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Point: {data.team[2].points}</h1>
                                            <h1 className="w-48 h-1/4 text-2xl flex items-center justify-center">Win : {data.team[2].record.win}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-36 h-40"></div>
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-4xl font-medium pb-16">Loading...</h1>
                    </div>
                )}
            </div>
        </>
    )
}