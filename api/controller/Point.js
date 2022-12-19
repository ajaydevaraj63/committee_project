const PointTable = require('../models/GamePointTable.js')
const UserTables = require('../models/UserTable.js')
const Event = require('../models/Event.js')
const Group = require('../models/Groups.js')
const Joi = require('@hapi/joi');
const Point = require('../models/TotalPoint.js');

const schema = Joi.object().keys({
    GamePoint: Joi.number().required(),



});
const schemaForUpdate = Joi.object().keys({

    GamePoint: Joi.number().required(),


});


exports.AddPoint = async (req, res) => {
    try {
        const JsonObj = {

            GamePoint: req.body.GamePoint,

        }
        const Validation = schema.validate(JsonObj)
        if (!Validation.error) {
            const NewPointEntry = new PointTable(req.body);
            await NewPointEntry.save((error, data) => {
                if (error) {
                    res.send(error)
                }
                else {
                    res.send(data)
                }

            });
        }
        else {
            res.send(Validation.error)
        }

    }
    catch (error) {
        throw error
    }
}


exports.UpdatePointTable = async (req, res) => {
    try {

        const Validation = schemaForUpdate.validate(req.body)
        console.log(Validation.error)
        if (!Validation.error) {
            if (req.body) {
                PointTable.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
                    if (!error) {
                        res.send(data)

                    }
                    else {
                        res.send(error)


                    }
                });


            }
            else {

                res.send("nothing to update")
            }

        }

        else {
            res.send(Validation.error)
        }

    } catch (error) {
        throw error

    }
}


exports.DisplayPoints = async (req, res) => {
    try {
        PointTable.find({ "Delete": 0 }, (error, data) => {
            if (!error) {
                res.send(data)
            }
            else {
                res.send(error)
            }
        })


    } catch (error) {
        throw error

    }
}




exports.GetInfo = (req, res) => {

    PointTable.aggregate([
        {
            $lookup: {
                from: "events", localField: "EventId", foreignField: "_id", as: "Eventlist"
            }


        },
        {
            $lookup: {
                from: "groups", localField: "GroupId", foreignField: "_id", as: "grouplist"
            }


        },
        {
            $lookup: {
                from: "games", localField: "GameId", foreignField: "_id", as: "gameList"
            }


        }

    ]).then(result => {
        res.send(result)
    })

}
exports.getInfo=((req,res)=>{
   Point.find({EventId:req.body.EventId}).sort({TotalPoint:-1}).limit(2).exec((err, docs) => {
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


