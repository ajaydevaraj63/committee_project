const FinalSumTable = require("../models/FinalSumTable")

exports.GetInfo = (req, res) => {

    FinalSumTable.aggregate([
        {
            $match: {
                "EventId": mongoose.Types.ObjectId(req.body.EventId)

            }
        },


        {
            $lookup: {
                from: "groups", localField: "GroupId", foreignField: "_id", as: "grouplist"
            }


        }

    ]).then(result => {
        res.send(result)
    })

}
exports.AddPoints=(req,res)=>{
    FinalSumTable.save(req.body,(error,data)=>{
        if(!error){
            res.send(data)
        }
        else{
            res.send(error)
        }
    })
}
exports.UpdatePoints=(req,res)=>{
    FinalSumTable.findByIdAndUpdate(req.body,{ $set: req.body },(error,data)=>{
        if(!error){
            res.send(data)
        }
        else{
            res.send(error)
        }
    })
}
