
const {app} =require("./app")
require("dotenv").config()

const connection =require("./db/connection")




app.get("/test",async(req,res)=>{
    res.send("hello......")
})


const port = process.env.PORT
app.listen(port,async()=>{
    try {
        await connection
        console.log(`app is running on http://localhost:${port}`)
    } catch (error) {
         console.log(error)
    }
   
})


const{app} = require("./app")
require("dotenv").config()

const port=process.env.PORT
const {connect}=require("./db/connection")





app.listen(port,async()=>{
    try{
        await connect
        
        console.log(`app is running on http://localhost:${port}`)
    }
    catch(err){
        console.log(err)
    }
    
 })

