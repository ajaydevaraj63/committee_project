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
    UserId:{
        type:String
    }

},{timestamps:true})

module.exports=mongoose.model("events",EventSchema);