const TotalPoint = require("../models/TotalPoint")

exports.AddPoint=(req,res)=>{
    TotalPoint.create(req.body,(error,data)=>{
        if(!error){
            res.send(data)
        }
    })
}
exports.getInfoTotalPoint=((req,res)=>{
    TotalPoint.find({EventId:req.body.EventId}).sort({TotalPoint:-1}).limit(2).exec((err, docs) => {
     if (err) {
         const responseObj = {
         "status": "error",
         "msg": "Input is missing.",
         "body": {}
       }
       res.status(500).send(responseObj);
     
     } 
     else{
         res.send(docs)
     }
   })
 })
 
 
 