import axios from 'axios';

const api_url = "http://localhost:3000/api";

const loadDataHome = async() => {
    const top3Team = await axios.get(`${api_url}/team/get-top-3`);
    const top3Player = await axios.get(`${api_url}/player/get-top-3`);
    const lastMatch = await axios.get(`${api_url}/match/get-last-match`);

    const data = {
        team: top3Team.data,
        player: top3Player.data,
        match: lastMatch.data
    }

    return data;
}

export default { loadDataHome };