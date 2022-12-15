const mongoose=require('mongoose')
const groupAlocSchema=mongoose.Schema({
    GroupId:{
        type:String,
        require:true
    },
    UserId:{
        type:String,
        require:true
    }
},{Timestamp:true})
module.exports=mongoose.model("groupaloc",groupAlocSchema);