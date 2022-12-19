const Designation = require("../models/Designation")

exports.addDesig=(req,res)=>{
    Designation.create(req.body,(error,data)=>{
        if(!error){
            res.send(data)
        }
    })
}
exports.FindAllDesignation=(req,res)=>{
    Designation.find((error,data)=>{
        res.send(data)
    })
}