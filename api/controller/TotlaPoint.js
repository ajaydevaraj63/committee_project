const TotalPoint = require("../models/TotalPoint")
const mongoose = require('mongoose')
const joi=require('@hapi/joi')
const Schema =joi.object().keys({
    GroupId: joi.string(),
    GroupPoint:joi.number(),
    GameId:joi.number(),
    EventId:joi.number()
})
exports.AddPoint = (req, res) => {
    TotalPoint.create(req.body, (error, data) => {
        if (!error) {
            res.send(data)
        }
    })
}
exports.AddPointAll = (req, res) => {
    const list = req.body.data;
    const data = req.body;
    const listForJson = [];

    for (const element of list) {
        const data1 = {

            "EventId": req.body.EventId,
            "GroupId": req.body.GroupId,
            "GameId": element.GameId,
            "GamePoint": element.GamePoint

        }



        listForJson.push(data1)
    }
    
    TotalPoint.insertMany(listForJson, (data, error) => {
        if (!error) {
          
            res.send(data)
        }
        else{
            res.send(error)
        }

    })

}



exports.getInfoTotalPoint = ((req, res) => {
    TotalPoint.find({ EventId: req.body.EventId }).sort({ TotalPoint: -1 }).limit(2).exec((err, docs) => {
        if (err) {
            const responseObj = {
                "status": "error",
                "msg": "Input is missing.",
                "body": {}
            }
            res.status(500).send(responseObj);

        }
        else {
            res.send(docs)
        }
    })
})
exports.GetInfo = (req, res) => {

    TotalPoint.aggregate([
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