const mongoose=require('mongoose')
const GameSchema=mongoose.Schema({
    GamePointTableId: { type: mongoose.Schema.Types.ObjectId, 
        ref: "gamepointtable"  },
    GameName:{
        require:true,
        type:String
    },
    GameDesc:{
        type:String
    },
    RulesPdf:{
        type:String
    },
    GroupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Groups" 
    },

    UserId:{
        type:String
    },
    StartDate:{
        type:Date,
        default: "",
        require: true
    }
    ,
    EndDate:{
        type:Date,
        default: "",
        require: true

    },
    Status:{
        type:Number,
        default: 0
    },

    Delete:{
        type:Number,
        default:0
    },
},{timestamps:true})
module.exports=mongoose.model("game",GameSchema);