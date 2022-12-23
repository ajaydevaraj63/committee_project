const TotalPoint = require("../models/TotalPoint")
const mongoose = require('mongoose')
const joi = require('@hapi/joi')
const { request } = require("express")
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
            "TotalPoint": element.TotalPoint,
            "UniqueKeyGm": element.GameId, "UniqueKeyGp": req.body.GroupId,
            "UniqueKeyEv": req.body.EventId


        }




        listForJson.push(data1)
    }

    TotalPoint.insertMany(listForJson, (data, error) => {
        if (!error) {
            console.log(data)
            res.send(data)
        }
        else {
            res.send(error)
        }

    })

}
exports.updateAll = async (req, res) => {
    console.log(req.body)
    const list = req.body.Data;
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
            const data2 = {

                "EventId": req.body.EventId,
                "GroupId": req.body.GroupId,
                "GameId": element.GameId,
                "TotalPoint": element.TotalPoint

            }
            // TotalPoint.aggregate([{$match:{EventId: mongoose.Types.ObjectId("63a47cf6c179c71a4906bb9e"),GroupId: mongoose.Types.ObjectId("6395a2c45831d2c96d22a6d2"),GameId: mongoose.Types.ObjectId("63a47d52e3c59f789f0c8268")}}

            console.log(data2.GameId);
            await TotalPoint.find( { UniqueKeyEv:req.body.EventId ,UniqueKeyGp: req.body.GroupId,UniqueKeyGm: element.GameId } 
                ,
            ).then((response) => {
                console.log(response)
                TotalPoint.findByIdAndUpdate(response[0]._id, { TotalPoint: data2.TotalPoint }, (error, data) => {
                    console.log(data)
                })
            })

        }
        res.send("saved")
    } catch (error) {

    }
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



exports.GetInfoTotalpointeqGroup = (req, res) => {

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
exports.findByGIdAndEvntId = ((req, res) => {
    console.log(req.body)
    TotalPoint.aggregate([{ $match: { EventId: mongoose.Types.ObjectId(req.body.EventId), GroupId: mongoose.Types.ObjectId(req.body.GroupId) } }
        ,
    {
        $lookup: {
            from: "games", localField: "GameId", foreignField: "_id", as: "gamelist"
        }


    }

    ]).then((response) => {
        res.send(response)
    })
})

exports.GetInfo = (req, res) => {


}