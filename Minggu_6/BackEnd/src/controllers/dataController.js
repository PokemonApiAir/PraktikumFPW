const fs = require('fs');
const dataPath = require('path').resolve(__dirname, '../data/data.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);

const showAllData = (req, res) => {
    return res.status(200).send(data);
}

const registerUser = (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    
    try {
        const check = data.find(u => u.email == email);
        if(check){
            return res.status(400).send({message: "already_exist"});
        }

        const temp = {
            email,
            first_name,
            last_name, 
            password,
            story: []
        }
        data.push(temp);

        return res.status(201).send({message: "created"});
    } catch (error) {
        return res.status(400).send(error);  
    }
}

const loginUSer = (req, res) => {
    const { email, password } = req.body;

    const filter_data = data.filter((u) => u.email == email)[0];

    if(!filter_data){
        return res.status(404).send({message: "not_found"});
    }

    if(filter_data.password === password){
        return res.status(200).send({message: "success"});
    }

    return res.status(400).send({message: "wrong_password"});
}

const getStory = (req, res) => {
    const { email } = req.query;

    const data_story = data.filter((u) => u.email == email)[0].story;

    return res.status(200).send({data: data_story});
}

const getUserData = (req, res) => {
    const { email } = req.query;

    const data_user = data.filter((u) => u.email == email)[0];
    const temp = {
        email: data_user.email,
        first_name: data_user.first_name,
        last_name: data_user.last_name, 
        password: data_user.password
    }

    return res.status(200).send({data: temp});
}

const getStoryId = (req, res) => {
    const { email, id } = req.query;

    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];

    return res.status(200).send({data: data_story});
}

const getStoryIdChara = (req, res) => {
    const { email, id } = req.query;

    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];
    const data_chara = data_story.chara

    return res.status(200).send({data: data_chara});
}

const detailChara = (req, res) => {
    const { email, id, character_id } = req.query;

    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];
    const data_chara = data_story.chara.filter(c => c.id_chara == character_id)[0];

    return res.status(200).send({data: data_chara});
}

const addChara = (req, res) => {
    const { email, id, nama, peran, umur, sifat, backstory} = req.body;

    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];
    
    const insert_chara = {
        id_chara: data_story.chara.length + 1,
        nama,
        peran,
        umur: parseInt(umur),
        sifat,
        backstory 
    }

    data_story.chara.push(insert_chara);

    return res.status(200).send(data);
}

const addStory = (req, res) => {
    const { email } = req.body;
    
    const data_user = data.filter(u => u.email == email)[0];

    const temp_data = {
        id : data_user.story.length + 1,
        judul: "",
        thumb: "",
        chara: []
    }

    data_user.story.push(temp_data);
    return res.status(200).send(data);
}

const updateChara = (req, res) => {
    const { email, id, character_id, nama, peran, umur, sifat, backstory} = req.body;

    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];

    const idx = data_story.chara.findIndex(c => c.id_chara == character_id);
    const new_data = data_story.chara[idx];

    new_data.nama = nama;
    new_data.peran = peran;
    new_data.umur = umur;
    new_data.sifat = sifat;
    new_data.backstory = backstory;

    data_story.chara[idx] = new_data;

    return res.status(200).send(data);
}

const updateThumb = (req, res) => {
    const { email, id, thumb } = req.body;
    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];
    data_story.thumb = thumb;

    return res.status(200).send(data);
}

const updateJudul = (req, res) => {
    const { email, id, judul } = req.body;
    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];
    data_story.judul = judul;

    return res.status(200).send(data);
}

const updateProfile = (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const data_user = data.filter(u => u.email == email)[0];
    data_user.email = email;
    data_user.first_name = first_name;
    data_user.last_name = last_name;
    data_user.password = password;

    return res.status(200).send(data);
}

const deleteStory = (req, res) => {
    const { email, id } = req.query;
    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id != id);

    data_user.story = data_story;
    resetStory(data_user.story);

    return res.status(200).send(data);
}

const deleteChara = (req, res) => {
    const { email, id, character_id } = req.query;

    const data_user = data.filter(u => u.email == email)[0];
    const data_story = data_user.story.filter(s => s.id == id)[0];
    const data_chara = data_story.chara.filter(c => c.id_chara != character_id);
    
    const idx = data.findIndex(i => i.email === email);

    data[idx].story[id - 1].chara = resetData(data_chara);

    return res.status(200).send(data)
}

const resetData = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].id_chara = (i + 1);
    }
    
    return data;
}

const resetStory = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].id = (i + 1);
    }
    
    return data;
}

module.exports = {
    showAllData,
    registerUser,
    loginUSer,
    getStory,
    getUserData,
    getStoryId,
    getStoryIdChara,
    detailChara,
    addChara,
    addStory,
    updateChara,
    updateThumb,
    updateJudul,
    updateProfile,
    deleteChara,
    deleteStory
}