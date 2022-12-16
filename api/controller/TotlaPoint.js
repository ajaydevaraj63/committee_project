const TotalPoint = require("../models/TotalPoint")

exports.GetTotalPoints=(req,res)=>{
    TotalPoint.create(req.body,(error,data)=>{
        if(!error){
            res.send(data)
        }
    })
}