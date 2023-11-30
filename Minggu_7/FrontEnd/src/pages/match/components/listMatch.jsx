import { useEffect, useState } from "react"
import axios from 'axios';

const api_url = "http://localhost:3000/api"

export default function ListMatch({data}) {
    const [teamHome, setTeamHome] = useState()
    const [teamAway, setTeamAway] = useState()

    const fetch = async () => {
        const team_home = await axios.get(`${api_url}/team/get-team-by-id`, {
            params: {
                id: data.team_home
            }
        })

        const team_away = await axios.get(`${api_url}/team/get-team-by-id`, {
            params: {
                id: data.team_away
            }
        })

        setTeamHome(team_home.data);
        setTeamAway(team_away.data);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <>
            <div className="w-full h-12 flex justify-around items-center text-lg gap-x-4 px-12">
                <h1 className="w-2/12 text-center">{teamHome?.name}</h1>
                <h1 className="w-2/12 text-center">{teamAway?.name}</h1>
                <h1 className="w-2/12 text-center">{data.score_home}</h1>
                <h1 className="w-2/12 text-center">{data.score_away}</h1>
                <h1 className="w-2/12 text-center">{formatDate(data.matchTime)}</h1>
                <h1 className="w-2/12 text-center">{data.round}</h1>
            </div>
        </>
    )
}