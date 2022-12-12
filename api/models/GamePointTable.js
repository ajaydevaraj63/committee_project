const mongoose = require('mongoose')
const GamePointSchema = mongoose.Schema({
  GameId: {

    require: true,
    type: String
    
  },
  Delete: {

    type: Number,
    default: 0

  },
  GamePoint: { 
    
    type: Number
   
  },
 GroupId: { 
    
  type: String
  
}
}, { timestamps: true })
module.exports = mongoose.model("gamepointtable", GamePointSchema);