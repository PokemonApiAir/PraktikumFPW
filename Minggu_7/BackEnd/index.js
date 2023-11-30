const mongoose = require('mongoose')
const express = require("express")
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apiRouter = require("./src/routes/indexRouter");
app.use("/api", apiRouter);

const port = 3000;

app.listen(port, async () => {
    console.clear();
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/football')
        console.log('Database connected')
    }
    catch(e){
        console.log('Error database connection \n', e)
    }
    console.log(`listening on port ${port}!`)
})