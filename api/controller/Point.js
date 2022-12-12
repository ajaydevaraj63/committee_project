const PointTable=require('../models/GamePointTable.js')

const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  GroupName: Joi.string().alphanum().min(3).max(30).required(),
  GroupType: Joi.string().alphanum().min(3).max(30).required()
 
});


exports.AddPoint=async(req,res)=>{
    try{
   const JsonObj={
        GameId:req.body.GameId,
      ScoreDetails:[{GamePoint:req.body.GamePoint,GroupId:req.body.GroupId}]
   }
        const NewPointEntry = new PointTable(obj);
      await  NewPointEntry.save((error, data) => {
            if (error) {
                res.send(error)
            }
            else{
                res.send(data)
            }

        });

    }
    catch(error){
        throw error
    }
}