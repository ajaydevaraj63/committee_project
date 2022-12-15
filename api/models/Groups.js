const mongoose=require('mongoose')
const groupSchema=mongoose.Schema({
    GroupName:{
        require:true,
        type:String
    },
    GroupImage:{
        type:String
    },
    GroupType:{
        type:String
    }
    ,Delete:{
        type:Number,
        default:0
    }
},{timestamps:true})
module.exports=mongoose.model("group",groupSchema);