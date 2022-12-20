const mongoose=require('mongoose')
const postSchema=mongoose.Schema({
    UserId:{
        type:String,
        require:true
    },
    PostImage:{
        type:String,
        require: true
    },  
    Tags:  [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],

    PostDescription: {
        type: String
    },

    Delete:{
        type:Number,
        default:0
    },
},{Timestamp:true})
module.exports=mongoose.model("post",postSchema)