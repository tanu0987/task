const Booking = require("./BookingModel")

add = (req,res)=>{
    validationerror = []

    if(!req.body. UserName)
      validationerror.push("User Name is required")
    if(!req.body.email)
      validationerror.push("Email is required")
    if(!req.body.contact)
      validationerror.push("Contact is required")
    if(!req.body.cabNum)
      validationerror.push("Cab Number is required")

    if(validationerror.length > 0)
    {
        res.json({
            status: 422,
            success: false,
            message: "Validation Error",
            errors: validationerror
        })
    }
    else{
        Booking.find({email: req.body.email})
        .then(content=>{
            if(!content)
            {
                let bookingObj = new Booking()
                bookingObj.UserName = req.body.UserName
                bookingObj.email = req.body.email
                bookingObj.contact = req.body.email
                bookingObj.cabNum = req.body.cabNum
                bookingObj.date = req.body.date
                bookingObj.save()
                .then(bookingData=>{
                    res.json({
                        status: 200,
                        success: true,
                        message: "Booking Record Inserted successfully",
                        data: bookingData
                    })

                })
                .catch(err=>{
                      res.json({
                        status: 500,
                        success: false,
                        message: "Internal Server Error"
                      })

                })
            }

        })
        .catchh(err=>{
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error"
            })

        })
    }
}
getall = async (req,res)=>{
    var totalcount = await Booking.find(req.body).countDocuments().exec()

    Booking.find(req.body)
    .then(bookingData=>{
       res.json({
         status: 200,
         success: true,
         message: "Data Loaded",
         data: bookingData
       })
    })
    .catch(err=>{
        res.json({
            status: 500,
            success: false,
            message: "Internal Server error",
            errors: err.message
        })

    })

}
singleBooking = (req,res)=>{
    validationerror = []
    
    if(!req.body._id)
      validationerror.push("_id is required")

    if(validationerror.length > 0)
    {
        res.json({
            status: 500,
            success: false,
            message: "Internal Server Error",
            errors: validationerror
        })  
    }
    else{
        Booking.findOne({_id: req.body._id})
        .then(bookingData=>{
            if(!bookingData)
            {
              res.json({
                status: 404,
                success: false,
                message: "Booking Record Not Found"
              })
            }
            else{
                res.json({
                    status: 200,
                    success: true,
                    message: "Booking Record Loaded successfully",
                    data: bookingData
                })
            }
        })
        .catch(err=>{
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                errors: err.message
            })

        })
    }
}
cancelBooking = (req,res)=>{
    validationerror = []
    
    if(!req.body._id)
      validationerror.push("_id is required")

    if(validationerror.length > 0)
    {
        res.json({
            status: 422,
            success: false,
            message: "Validation Error",
            errors: validationerror
        })
    }
    else{
        Booking.findOne({_id: req.body._id})
        .then(bookingData=>{
         if(!bookingData)
           {
            res.json({
                status: 404,
                success: false,
                message: "Record Not Found"
            })
           }
           else{
             if(req.body.status)
               bookingData.status = req.body.status
              .then(bookingData=>{
                  res.json({
                    status: 200,
                    success: true,
                    message: "Booking Record Cancel successfully",
                  })
              })
              .catch(err=>{
               res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                errors: err.message
               })
              })
           }
        })
        .catch(err=>{
            res.json({
                status: 500,
                success: false,
                message: "Internal Server Error",
                errors: err.message
            })

        })
    }
}


module.exports = {
       add,getall,singleBooking,cancelBooking,
}