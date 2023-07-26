const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
  GameId: { type: mongoose.Schema.Types.ObjectId, ref: "game" }



  ,
  EventId:
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" }

  ,
  Delete: {

    type: Number,
    default: 0

  },
  TotalPoint: {

    type: Number

  }, UniqueKeyGm: {
    type: String
  }, UniqueKeyGp: {
    type: String
  },
  UniqueKeyEv: {
    type: String
  },
  GroupId: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" }
}, { timestamps: true })

module.exports = mongoose.model("TotalPoints", EventSchema);