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

app.listen(port, () => {
    console.clear();
    console.log(`listening on port ${port}`);
})