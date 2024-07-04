const User = require("./registerModel")

registeruser = (req,res)=>{
    validationerrors = []
    if(!req.body.contact)
      validationerrors.push("Contact is required")
    if(!req.body.otp)
     validationerrors.push("Otp is required")    

    if(validationerrors.length>0)
    {
        res.json({
            status : 422,
            success:false,
            message : "Validation error",
            errors : validationerrors
        })
    }
    else{
       
        User.findOne({contact:req.body.contact})
        .then(bookingData=>{
            if(!bookingData)
            {
                
                let userObj = new User()
                userObj.contact = req.body.contact
                userObj.otp= req.body.otp
                

                userObj.save()

                    .then(usersave=>{
                        res.json({
                            status : 200,
                            success:true,
                            message : "user registered successfully",
                            data : usersave
                        })
                    })
                    .catch(err=>{
                        res.json({
                            status : 500,
                            success:false,
                            message : "Internal server error while creating User",
                            errors : err.message
                        })
                    })
                
                .catch(err=>{
                    res.json({
                        status : 500,
                        success:false,
                        message : "Internal server error",
                        errors : err.message
                    })
                })

            }
            else{
                res.json({
                    status:422,
                    success:false,
                    message : "Contact already exists"
                })
            }
        })
        .catch(err=>{
            res.json({
                status : 500,
                success:false,
                message : "Internal server error",
                errors : err.message
            })
        })
    }
}

module.exports = {
    registeruser
}

