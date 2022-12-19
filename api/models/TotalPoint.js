const mongoose=require('mongoose')

const EventSchema=mongoose.Schema({
    UserId:
    { type: mongoose.Schema.Types.ObjectId, ref: "UserTable" }

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

  },
  GroupId: { type: mongoose.Schema.Types.ObjectId,ref: "Groups" }
},{timestamps:true})

module.exports=mongoose.model("TotalPoints",EventSchema);