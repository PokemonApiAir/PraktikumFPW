import { redirect } from 'react-router-dom';
import axios from 'axios';

const api_url = "http://localhost:3000/api";

const loadDataMatch = async() => {
    const data = await axios.get(`${api_url}/match/get-all`)

    return data.data;
}

const formActionMatch = async(data) => {
    if(data.away === data.home){
        alert("Team tidak boleh sama");
        return redirect("/match/add")
    }

    try {
        const response = await axios.post(`${api_url}/match/add-match`, {
            team_home: data.home, 
            team_away: data.away,
            score_home: data.score_home,
            score_away: data.score_away,
            logs: data.logs,
            matchTime: new Date(data.match_time),
            round: data.round
        })
    } catch (error) {
        throw error;
    }

    return redirect("/match/home");
}

export default { loadDataMatch, formActionMatch };