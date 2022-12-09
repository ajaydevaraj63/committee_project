const { default: mongoose } = require('mongoose')
const moongoose=require('mongoose')

const UserSchema=new moongoose.Schema({
    UserName:{
        type:String,
        required:true,
       
    },
    Email:{
        type:String,
        required:true,
       
    },
    DOB:{
        type:Date,
        required:true
    },
    Type:{
        type:Number,
        default:false
    },
    GroupRole:{
        type:Number,
        default:0
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
    ,
    GroupId:{
        type:String,
        default:0
       
    }
    ,
    UserImage:{
       type:String
    }

    
},{timestamps:true})
module.exports=mongoose.model("userstable",UserSchema);