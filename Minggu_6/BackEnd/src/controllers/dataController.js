const fs = require('fs');
const dataPath = require('path').resolve(__dirname, '../data/data.json');
const rawData = fs.readFileSync(dataPath);
const data = JSON.parse(rawData);

const showAllData = (req, res) => {
    return res.status(200).send(data);
}

const registerUser = (req, res) => {
    const { email, nama, password } = req.body;
    
    try {
        const temp = {
            email,
            nama, 
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

module.exports = {
    showAllData,
    registerUser,
    loginUSer,
    getStory
}