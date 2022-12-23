const mongoose=require('mongoose')

const EventSchema=mongoose.Schema({
    File: {
        require: true,
        type: String
    },
    EventName:{
        require:true,
        type:String
    },
    EventDescription:{
        type:String
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: "userstable"

    },
    StartDate:{
        type:Date,
        default: "",
        require: true
    }
    ,
    EndDate:{
        type:Date,
        default: "",
        require: true

    },
    Status:{
        type:Number,
        default: 0
    },
    Delete:{
        type:Number,
        default:0
    },
    GroupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Groups" 
    },
    GamePointTableId: { type: mongoose.Schema.Types.ObjectId, 
        ref: "gamepointtable"  },
    TotalPoint: {
        type: Number
    },
    GameId: 
    { type: mongoose.Schema.Types.ObjectId, ref: "Games" }
    ,
},{timestamps:true})

module.exports=mongoose.model("events",EventSchema);