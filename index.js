const express = require("express")
const app = express()
const port = 4007
const config = require("./config/db")

app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'40mb'}))


const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

app.all("**",(req,res)=>{
    res.json({
        status:404,
        success:false,
        message : "Route not found"
    })
})

app.listen(port,()=>{
    console.log("Server running at port ",port)
})

