import { redirect } from "react-router-dom";
import axios from 'axios';

const url_api = `http://localhost:3000/api/data`;

const login = async (data) => {
    try {
        const response = await axios.post(`${url_api}/login`, {
            email: data.email,
            password: data.password
        });
        localStorage.setItem("email", data.email);
        window.location = "/home/stories";
    } catch (error) {
        const message = error.response.data.message;
        const status = parseInt(error.response.status);
        let err_msg;
        if(message === "not_found"){
            err_msg = {
                message: "Not Found",
                status: status
            }
        } else if(message === "wrong_password"){
            err_msg = {
                message: "Wrong Password",
                status: status
            }
        }
        return err_msg;
    }
};

const register = async (data) => {
    try {
        const response = await axios.post(`${url_api}/register`, {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password
        })

        alert("Account created")
    } catch (error) {
        const message = error.response.data.message;
        const status = parseInt(error.response.status);

        let err_msg;

        if(message === "already_exist"){
            err_msg = {
                message: "Email already exist",
                status: status
            };
        }

        showModal(err_msg);
    }
};

const getData = async () => {
    try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`${url_api}/get-user`, {
            params: {
                email: email
            }
        })

        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getStory = async () => {
    try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`${url_api}/get-story`, {
            params: {
                email: email
            }
        })

        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getStoryID = async (data) => {
    const { params } = data;
    try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`${url_api}/get-story-id`, {
            params: {
                email: email,
                id: params.id
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const getStoryIdChara = async (data) => {
    const { params } = data;
    try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`${url_api}/get-story-id-chara`, {
            params: {
                email: email,
                id: params.id
            }
        })
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const detailChara = async (data) => {
    const { params } = data;
    try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`${url_api}/detail-chara`, {
            params: {
                email: email,
                id: params.id,
                character_id: params.character_id
            }
        })
        response.data.data.id = params.id;
        return response.data.data;
    } catch (error) {
        throw error;
    }
}

const formAction = async (data) => {
    const { params } = data;
    const email = localStorage.getItem("email");
    if (data.request.method == "POST"){
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);

        try {
            const response = await axios.post(`${url_api}/add-chara`, {
                email: email,
                id: params.id,
                nama: item.nama,
                peran: item.peran,
                umur: item.umur,
                sifat: item.sifat,
                backstory: item.backstory,
            })
        } catch (error) {
            throw error;
        }
    }else if(data.request.method == "PUT"){
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);
    }

    return redirect(`/home/stories/${params.id}/characters`);
}

const deleteChara = async (data) => {
    const email = localStorage.getItem("email");

    try {
        const response = await axios.delete(`${url_api}/delete-chara`, {
            params: {
                email: email,
                id: parseInt(data.id),
                character_id: parseInt(data.id_chara)
            }
        })
        console.log(response);
    } catch (error) {
        throw error;
    } 

    return window.location = `/home/stories/${parseInt(data.id)}/characters/`
}

const saveChara = async () => {
    const email = localStorage.getItem("email");
    try {
        const response = await axios.put(`${url_api}/update-chara`, {
            email: email,
            id: params.id,
            character_id: params.character_id,
            nama: item.nama,
            peran: item.peran,
            umur: item.umur,
            sifat: item.sifat,
            backstory: item.backstory,
        })
    } catch (error) {
        throw error;
    }
}

const formOverview = async (data) => {
    const { params } = data;
    const email = localStorage.getItem("email");
    if (data.request.method == "PUT") {
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);
        
        try {
            const response = await axios.put(`${url_api}/update-thumb`, {
                email: email,
                id: params.id,
                thumb: item.thumb
            })    
        } catch (error) {
            throw error;
        }
    } else if (data.request.method == "PATCH") {
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);

        try {
            const response = await axios.put(`${url_api}/update-judul`, {
                email: email,
                id: params.id,
                judul: item.judul
            })    
        } catch (error) {
            throw error;
        }
    } else if(data.request.method == "DELETE"){
        try {
            const response = await axios.delete(`${url_api}/delete-story`, {
                params: {
                    email: email,
                    id: params.id
                }
            })    
        } catch (error) {
            throw error;
        }
    }

    return redirect(`/home/stories`);
}

const formAddStory = async(data) => {
    const email = localStorage.getItem("email");
    if(data.request.method == "POST"){
        try {
            const response = await axios.post(`${url_api}/add-story`, {
                email: email
            });    
        } catch (error) {
            throw error;
        }
    }

    return redirect(`/home/stories`);
}

const updateProfile = async(data) => {
    const email = localStorage.getItem("email");
    
    try {
        const response = await axios.put(`${url_api}/update-profile`, {
            email: email,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password,
        });
    } catch (error) {
        throw error;
    }

    return window.location = "/home/profile";
}

function showModal(err_msg) {
    const modalElement = document.createElement('div');
    modalElement.className = 'w-screen h-screen absolute flex justify-center items-center custom-modal';
    modalElement.innerHTML = `
        <div class='w-3/12 h-1/6 bg-white rounded-lg flex flex-col items-center'>
            <button class='w-full text-lg text-end pe-2 pt-1' id="closeModalBtn">✖️</button>
            <p class='text-xl font-bold pt-3'>${err_msg.status}</p>
            <p class='text-red-500'>${err_msg.message}</p>
        </div>
    `;
    const firstChild = document.body.firstChild;
    document.body.insertBefore(modalElement, firstChild);

    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
}
  
function closeModal() {
    const modalElement = document.querySelector('.custom-modal');
    if (modalElement) {
        modalElement.remove();
    }

    return window.location = "/login";
}

export default { login, register, getData, getStory, getStoryID, getStoryIdChara, detailChara, formAction, formOverview, formAddStory, updateProfile, deleteChara };