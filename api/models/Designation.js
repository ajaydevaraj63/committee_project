const mongoose=require('mongoose')
const postSchema=mongoose.Schema({
    Designation:{
        type:String,
        
    },
     Tags:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],

},{Timestamp:true})
module.exports=mongoose.model("post",postSchema)