const { default: mongoose } = require('mongoose')
const moongoose=require('mongoose')

const UserSchema=new moongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    DOB:{
        type:Date,
        required:true
    },
    Type:{
        type:Number,
        default:false
    },
    Designation:{
        type:String,
        require:true

    }
    ,
    Delete:{
        type:Number,
        default:0
    }
    
},{timestamps:true})
module.exports=mongoose.model("userstable",UserSchema);