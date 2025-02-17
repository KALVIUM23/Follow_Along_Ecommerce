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
