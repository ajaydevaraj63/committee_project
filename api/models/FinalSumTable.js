const mongoose = require('mongoose')
const GamePointSchema = mongoose.Schema({
  GameId: 
  { type: mongoose.Schema.Types.ObjectId, ref: "Games" },
  EventId:
  { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
 
  Delete: {

    type: Number,
    default: 0

  },
  GamePoint: {

    type: Number

  },
  GroupId: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" }

}, { timestamps: true })
module.exports = mongoose.model("FinalPoint", GamePointSchema);