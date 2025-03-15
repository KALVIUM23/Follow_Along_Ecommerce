const express = require("express");
const connect = require("./db/connection");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/test", async (req, res) => {
    res.send("hello......");
});

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    try {
        await connect();
        console.log(`app is running on http://localhost:${port}`);
    } catch (error) {
        console.log(error);
    }
});

