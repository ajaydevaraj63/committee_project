const mongoose=require('mongoose')
const EventSchema=mongoose.Schema({
    PdfName:{
        require:true,
        type:String
    },
    Text:{
        type:String
    },
    UserId:{
        type:String
    }
},{timestamps:true})
module.exports=mongoose.model("event",EventSchema);