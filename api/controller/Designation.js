const Designation = require("../models/Designation")

exports.addDesig=(req,res)=>{
    Designation.create(req.body,(error,data)=>{
        if(!error){
            res.send(data)
        }
    })
}
exports.FindAllDesignation=(req,res)=>{
    GroupSchema.find({"Delete": "0"},(error,data)=>{
        res.send(data)
    })
}