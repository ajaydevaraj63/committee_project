const GamePointdb = require('../models/GamePointTable.js')

exports.GetPointsOfAll = (req, res) => {

    GamePointdb.aggregate([
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
