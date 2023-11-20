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
        window.location = "/home";
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
    if (data.request.method == "POST") {
        const formData = await data.request.formData();
        const item = Object.fromEntries(formData);

        try {
            const response = axios.post(`${url_api}/register`, {
                email: item.email,
                nama: item.nama,
                password: item.password
            })

            alert("Account created")
        } catch (error) {
            const message = error.response.data.message;
            const status = parseInt(error.response.status);
            const err_msg = {
                message: message,
                status: status
            };

            return showModal(err_msg);
        }
    }
    
    return redirect("/");
};

const getData = () => {
    console.log(localStorage.getItem("email"));
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
}

export default { login, register, getData };