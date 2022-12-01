const mongoose=require('mongoose')
const GamePointSchema=mongoose.Schema({
    GameId:{
        require:true,
        type:String
    },
  ScoreDetails:[{GamePoint:Number,GroupId:String}]
},{timestamps:true})
module.exports=mongoose.model("gamepointtable",GamePointSchema);