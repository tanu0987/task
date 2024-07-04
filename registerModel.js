const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
   contact: {type: Number, default: null},
   otp : {type: String, default: null}
})

module.exports =  new mongoose.model("user",userSchema)