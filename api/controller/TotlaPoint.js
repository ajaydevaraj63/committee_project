const TotalPoint = require("../models/TotalPoint")
const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const GameTable = require("../models/GameTable")
const Schema = joi.object().keys({
    GroupId: joi.string(),
    GroupPoint: joi.number(),
    GameId: joi.number(),
    EventId: joi.number()
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
            "TotalPoint": element.TotalPoint

        }




        listForJson.push(data1)
    }
    console.log(listForJson)
    TotalPoint.insertMany(listForJson, (data, error) => {
        if (!error) {

            res.send(data)
        }
        else {
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
exports.GetInfo = (req, res) => {

   GameTable.find(req.body).then((response)=>{
    res.send(response)
   })
}



exports.GetInfoTotalpointeqGroup = (req, res) => {
    console.log("hello")

    TotalPoint.aggregate([


        {
                        $lookup: {
                from: "games", localField: "GameId", foreignField: "_id", as: "gamelist"
            }


        }

    ]).then(result => {
        res.send(result)
    })

}

exports.findByGIdAndEvntId=((req,res)=>{
 TotalPoint.aggregate([{$match:{EventId: mongoose.Types.ObjectId("63a1ed4f48a858c442d78448"),GroupId: mongoose.Types.ObjectId("6395a2c45831d2c96d22a6d2")}}
,
{
                $lookup: {
        from: "games", localField: "GameId", foreignField: "_id", as: "gamelist"
    }


}

]).then((response)=>{
    res.send(response)
 })
})





exports.updateAll = (req, res) => {
    const list = req.body.data;
    const data = req.body;
    const listForJson = [];

    for (const element of list) {
        const data1 = {

            "EventId": req.body.EventId,
            "GroupId": req.body.GroupId,
            "GameId": element.GameId,
            "TotalPoint": element.TotalPoint

        }




        listForJson.push(data1)
    }
    for (const element of listForJson) {
        const data2 = {

            "EventId": req.body.EventId,
            "GroupId": req.body.GroupId,
            "GameId": element.GameId,
            "TotalPoint": element.TotalPoint

        }
      TotalPoint.update({GroupId: req.params.GroupId},data2).then((response)=>{
       console.log(data2)
      })

}
request.send("saved")
}


exports.findByGIdAndEvntId=((req,res)=>{
 TotalPoint.aggregate([{$match:{EventId: mongoose.Types.ObjectId("63a1ed4f48a858c442d78448"),GroupId: mongoose.Types.ObjectId("6395a2c45831d2c96d22a6d2")}}
,
{
                $lookup: {
        from: "games", localField: "GameId", foreignField: "_id", as: "gamelist"
    }


}

]).then((response)=>{
    res.send(response)
 })
})


exports.updateAll = (req, res) => {
    const list = req.body.data;
    const data = req.body;
    const listForJson = [];

    for (const element of list) {
        const data1 = {

            "EventId": req.body.EventId,
            "GroupId": req.body.GroupId,
            "GameId": element.GameId,
            "TotalPoint": element.TotalPoint

        }




        listForJson.push(data1)
    }
    for (const element of listForJson) {
        const data2 = {

            "EventId": req.body.EventId,
            "GroupId": req.body.GroupId,
            "GameId": element.GameId,
            "TotalPoint": element.TotalPoint

        }
      TotalPoint.update({GroupId: req.params.GroupId,GameId:element.GameId,EventId:req.body.EventId},data2).then((response)=>{
       console.log(data2)
      })}

}
