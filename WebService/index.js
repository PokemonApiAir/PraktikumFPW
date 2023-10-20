const express = require('express');
const app = express();
const Joi = require('joi').extend(require('@joi/date'))
const { QueryTypes, Sequelize } = require('sequelize')

const port = 3000;
app.use(express.urlencoded({ extended: true }));

const conn = new Sequelize("t4_6951", 'root', "", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

const initApp = async () => { 
    console.log("Testing database connection");
    try {
        await conn.authenticate();
        console.log("Successfully connected!");
        app.listen(port, () =>
            console.log(`App listening on port ${port}!`)
        );
    } catch (error) {
        console.error("Failure database connection : ", error.original);
    }
}

initApp();

app.post("/api/accounts", async function(req, res){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        nama_lengkap: Joi.string().required(),
        nomor_telepon: Joi.string().min(8).max(10).pattern(/^[0-9]+$/),
        password: Joi.string().required(),    
        confirm_password:Joi.string().required().valid(Joi.ref('password'))
    })

    let check_nama = req.body.nama_lengkap.split(" ");
    if(check_nama.length > 1){
        try {
            await schema.validateAsync(req.body);

            let check_email = await conn.query(
                `select * from Users where email=:email`,
                {
                    type: QueryTypes.SELECT,
                    replacements:{
                        email: req.body.email
                    }
                }
            )

            if(check_email.length > 0){
                return res.status(401).send({
                    "message": "Email not unique"
                });
            }

            let count_user = await conn.query(
                `select * from Users`,
                {
                    type: QueryTypes.SELECT
                }
            )

            count_user = count_user.length;
            let id_user;
            if(count_user > 0){
                if(count_user < 10){
                    id_user = "AC00" + (++count_user);
                }else if(count_user < 100){
                    id_user = "AC0" + (++count_user);
                }else{
                    id_user = "AC" + (++count_user);
                }
            }else{
                id_user = "AC001";
            }
            
            let result = await conn.query(
                `insert into Users(id_user, email, nama_lengkap, nomor_telepon, password) values(:id_user, :email, :nama_lengkap, :nomor_telepon, :password)`,
                {
                    replacements: {
                        id_user: id_user,
                        email: req.body.email,
                        nama_lengkap: req.body.nama_lengkap,
                        nomor_telepon: req.body.nomor_telepon,
                        password: req.body.password
                    }
                }
            )

            let data = {
                "id": id_user,
                "email": req.body.email,
                "nama_lengkap": req.body.nama_lengkap,
                "nomor_telepon": req.body.nomor_telepon,
                "password": req.body.password,
            }

            return res.status(201).send({
                "body": data
            })
        } catch (error) {
            return res.status(403).send(error.toString())
        }
    }else{
        return res.status(400).send({
            "message": "Format nama lengkap tidak valid"
        })
    }


});

app.post("/api/modules", async function(req, res){
    const schema = Joi.object({
        acc_id: Joi.string().min(5).max(5).required(),
        nama_modul: Joi.string().required(),
        password: Joi.string().alphanum().min(5).max(5).required(),    
        confirm_password:Joi.string().required().valid(Joi.ref('password'))
    })

    let nama_modul;
    nama_modul = req.body.nama_modul.split(" ")
    if(nama_modul.length > 1){
        try {
            await schema.validateAsync(req.body);

            let check_user = await conn.query(
                `select * from Users where id_user=:id_user`,
                {
                    type: QueryTypes.SELECT,
                    replacements: {
                        id_user: req.body.acc_id
                    }
                }
            )

            if(check_user.length == 0){
                return res.status(404).send({
                    "message": "User not found"
                })
            }

            let count_module = await conn.query(
                `select * from Modules`,
                {
                    type: QueryTypes.SELECT
                }
            )

            count_module = count_module.length;
            let id_module;
            if(count_module > 0){
                if(count_user < 10){
                    id_module = "MO00" + (++count_module);
                }else if(count_user < 100){
                    id_module = "MO0" + (++count_module);
                }else{
                    id_module = "MO" + (++count_module);
                }
            }else{
                id_module = "MO001";
            }
            
            let result = await conn.query(
                `insert into Modules(id_modules, pembuat_module, nama_module, password) values(:id_modules, :pembuat_module, :nama_module, :password)`,
                {
                    replacements: {
                        id_modules: id_module,
                        pembuat_module: req.body.acc_id,
                        nama_module: req.body.nama_modul,
                        password: req.body.password
                    }
                }
            )

            let data = {
                "id": id_module,
                "pembuat_module": req.body.acc_id,
                "nama_module": req.body.nama_modul,
                "password": req.body.password,
            }

            return res.status(201).send({
                "body": data
            })
        } catch (error) {
            return res.status(403).send(error.toString())
        }
    }else{
        return res.status(400).send({
            "message": "Format nama lengkap tidak valid"
        })
    }


});

app.post("/api/modules/add_question/:module_id", async function(req, res){
    const schema = Joi.object({
        module_id: Joi.string().min(5).max(5).required(),
        password: Joi.string().min(5).max(5).required(),
        kalimat_pertanyaan: Joi.string().required(),
        pilihan_jawaban_a: Joi.string().alphanum().required(),
        pilihan_jawaban_b: Joi.string().alphanum().required(),
        jawaban_benar: Joi.number().min(0).max(1).required(),
        skor: Joi.number().min(1).max(100).required()
    })

    try {
        const data_check = {
            ...req.params,
            ...req.body
        }

        await schema.validateAsync(data_check);

        let count_question = await conn.query(
            `select * from Questions`,
            {
                type: QueryTypes.SELECT
            }
        )

        count_question = count_question.length;

        let id_question
        if(count_question > 0){
            if(count_question < 10){
                id_question = "QU00" + (++count_question);
            }else if(count_question < 100){
                id_question = "QU0" + (++count_question);
            }else{
                id_question = "QU" + (++count_question);
            }
        }else{
            id_question = "QU001"
        }

        let result = await conn.query(
            `insert into Questions(id_question, kalimat_pertanyaan, pilihan_jawaban_a, pilihan_jawaban_b, jawaban_benar, skor, id_module) values(:id_question, :kalimat_pertanyaan, :pilihan_jawaban_a, :pilihan_jawaban_b, :jawaban_benar, :skor, :id_module)`,
            {
                replacements: {
                    id_question: id_question,
                    kalimat_pertanyaan: req.body.kalimat_pertanyaan,
                    pilihan_jawaban_a: req.body.pilihan_jawaban_a,
                    pilihan_jawaban_b: req.body.pilihan_jawaban_b,
                    jawaban_benar: req.body.jawaban_benar,
                    skor: req.body.skor,
                    id_module: req.params.module_id
                }
            }
        );

        let module = await conn.query(
            `SELECT m.id_module as "id", u.nama_lengkap as "pembuat_modul", m.nama_module as "nama_modul" FROM users u, modules m WHERE m.pembuat_module=u.id_user and m.id_module=:id_module`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    id_module: req.params.module_id
                }
            }
        )

        let question = await conn.query(
            `SELECT id_question as "id", kalimat_pertanyaan, pilihan_jawaban_a, pilihan_jawaban_b, jawaban_benar, skor FROM Questions WHERE id_module=:id_module`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    id_module: req.params.module_id
                }
            }
        )

        const data = {
            "id": module[0].id,
            "pembuat_module": module[0].pembuat_module,
            "nama_modul": module[0].nama_modul,
            "pertanyaan": question
        }

        
        return res.status(201).send({
            "body": data
        })
        
    } catch (error) {
        return res.status(403).send(error.toString())
    }
});

app.get("/api/modules/:module_id", async function(req, res){
    const schema = Joi.object({
        module_id: Joi.string().min(5).max(5).required()
    })

    try {
        await schema.validateAsync(req.params);

        let module = await conn.query(
            `SELECT m.id_module as "id", u.nama_lengkap as "pembuat_modul", m.nama_module as "nama_modul" FROM users u, modules m WHERE m.pembuat_module=u.id_user and m.id_module=:id_module`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    id_module: req.params.module_id
                }
            }
        )

        if(module.length === 0){
            return res.status(404).send({
                "message": "Module tidak ditemukan"
            })
        }

        let question = await conn.query(
            `SELECT id_question as "id", kalimat_pertanyaan, pilihan_jawaban_a, pilihan_jawaban_b, jawaban_benar, skor FROM Questions WHERE id_module=:id_module`,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    id_module: req.params.module_id
                }
            }
        )

        const data = {
            "id": module[0].id,
            "pembuat_module": module[0].pembuat_module,
            "nama_modul": module[0].nama_modul,
            "pertanyaan": question
        }

        
        return res.status(201).send({
            "body": data
        })
    } catch (error) {
        return res.status(403).send(error.toString())
    }
});