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
    const list = req.body.Data;
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
 TotalPoint.aggregate([{$match:{EventId: mongoose.Types.ObjectId(req.body.EventId),GroupId: mongoose.Types.ObjectId(req.body.GroupID)}}
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




exports.updateAll = async(req, res) => {
    const list = req.body.data;
    const data = req.body;
    const listForJson = [];

  try {
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
        const data = {

            "EventId": req.body.EventId,
            "GroupId": req.body.GroupId,
            "GameId": element.GameId,
            "TotalPoint": element.TotalPoint

        }
       await  TotalPoint.aggregate([{$match:{EventId: mongoose.Types.ObjectId(req.body.EventId),GroupId: mongoose.Types.ObjectId(req.body.GroupId),GameId: mongoose.Types.ObjectId(element.GameId)}}
        ,
        {
                        $lookup: {
                from: "games", localField: "GameId", foreignField: "_id", as: "gamelist"
            }
        
        
        }
        
        ]).then(async(response)=>{
            console.log(response)
           TTable.findByIdAndUpdate(response[0]._id,{TotalPoint:element.TotalPoint},(error,data)=>{
                if(!error){
                    console.log(data)
                }
                else{
                    console(error)
                }
            })
         })
      }

    
  } catch (error) {
    throw error
    
  }
}