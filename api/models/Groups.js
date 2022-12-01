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
},{timestamps:true})
module.exports=mongoose.model("group",groupSchema);