const mongoose=require('mongoose')
const postSchema=mongoose.Schema({
    UserId:{
        type:String,
        require:true
    },
    PostImage:{
        type:String
    }
    

},{Timestamp:true})
module.exports=mongoose.model("post",postSchema)