const mongoose=require('mongoose')
const postSchema=mongoose.Schema({
    Designation:{
        type:String,
        
    }

},{Timestamp:true})
module.exports=mongoose.model("Designation",postSchema)
