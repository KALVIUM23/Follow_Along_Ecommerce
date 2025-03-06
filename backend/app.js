<<<<<<< HEAD

let express= require("express")
const {userRoute} =require("./controllers/userRoute")
let app=express()
app.use(express.json())

const cors= require("cors")
const Errorhandle=require("./middelware/error")


app.use(cors({
    origin: 'http://localhost:5175', 
    credentials: true
}));





app.use("/user",userRoute)

 



app.use(Errorhandle)

module.exports={app}
=======
const express = require("express");
const app = express();
app.use(express.json());
const { userRoute } = require("./controllers/userRoute")
const errormiddleware=require("./middelware/error")



app.get("/test", async (req, res) => {
  res.send("hello.....");
});


app.use("/user", userRoute)



app.use(errormiddleware)

module.exports = { app };
>>>>>>> 0a072ecc1eed972990480c1fa55fe83eb14213c7
