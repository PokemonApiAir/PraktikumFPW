import { redirect } from 'react-router-dom';
import axios from 'axios';

const api_url = "http://localhost:3000/api";

const loadDataTeam = async() => {
    const data = await axios.get(`${api_url}/team/get-all`)

    return data.data;
}

const loadEditTeam = async(data) => {
    const { params } = data;
    
    const result = await axios.get(`${api_url}/team/get-team-by-id`, {
        params: {
            id: params.id
        }
    })

    return result.data;
}

const formActionTeam = async(data) => {
    const { params } = data;
    const formData = await data.request.formData();
    const item = Object.fromEntries(formData);
    if (data.request.method == "PUT") {
        try {
            const response = await axios.put(`${api_url}/team/update-team`, {
                id: params.id,
                name: item.name,
                coach: item.coach
            });
        } catch (error) {
            throw error;
        }
    } else if (data.request.method == "POST") {
        try {
            const response = await axios.put(`${api_url}/team/add-player`, {
                id: params.id,
                id_player: item.add_player
            });
        } catch (error) {
            throw error;
        }
    }

    return redirect("/team/home");
}

const formActionDelete = async(data) => {
    try {
        const response = await axios.put(`${api_url}/team/delete-player`, {
            id: data.id,
            id_player: data.id_player
        });
    } catch (error) {
        throw error;
    }

    return window.location = "/team/home";
}

const formActionCreate = async(data) => {
    try {
        const response = await axios.post(`${api_url}/team/add-team`, {
            name: data.name,
            coach: data.coach
        });
    } catch (error) {
        throw error;
    }

    return window.location = "/team/home";
}

const deleteTeam = async(id) => {
    try {
        const response = await axios.delete(`${api_url}/team/delete-team`, {
            params: {
                id: id
            }
        });
    } catch (error) {
        throw error;
    }

    return location.reload();
}

export default { loadDataTeam, loadEditTeam, formActionTeam, formActionDelete, formActionCreate, deleteTeam };