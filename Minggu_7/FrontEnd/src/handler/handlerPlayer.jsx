import { redirect } from 'react-router-dom';
import axios from 'axios';

const api_url = "http://localhost:3000/api";

const loadDataPlayer = async() => {
    const data = await axios.get(`${api_url}/player/get-all`)

    return data.data;
}

const loadEditPlayer = async(data) => {
    const { params } = data;
    
    const result = await axios.get(`${api_url}/player/get-player-by-id`, {
        params: {
            id: params.id
        }
    })

    return result.data;
}

const formActionPlayer = async(data) => {
    const { params } = data;
    if (data.request.method == "PUT") {
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);
        
        try {
            const response = await axios.put(`${api_url}/player/update-player`, {
                id: params.id,
                name: item.name,
                age: item.age,
                position: item.position,
                nationality: item.nationality,
                number: item.number
            });
        } catch (error) {
            throw error;
        }
    } else if (data.request.method == "POST") {
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);
        
        try {
            const response = await axios.post(`${api_url}/player/add-player`, {
                name: item.name,
                age: item.age,
                position: item.position,
                nationality: item.nationality,
                number: item.number
            });
        } catch (error) {
            throw error;
        }
    } else if (data.request.method == "DELETE") {
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);
        
        try {
            const response = await axios.delete(`${api_url}/player/delete-player`, {
                params: {
                    id: item.id
                }
            });

            location.reload();
        } catch (error) {
            throw error;
        }
    }

    return redirect("/player/home");
}

export default { loadDataPlayer, loadEditPlayer, formActionPlayer };