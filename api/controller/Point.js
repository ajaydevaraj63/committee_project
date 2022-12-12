const PointTable = require('../models/GamePointTable.js')

const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    GameId: Joi.string().alphanum().min(6).max(30).required(),
    GamePoint: Joi.number().required(),
    GroupId: Joi.string().alphanum().min(6).max(30).required()

});
const schemaForUpdate = Joi.object().keys({
    GameId: Joi.string().alphanum().min(6).max(30),
    GamePoint: Joi.number(),
    GroupId: Joi.string().alphanum().min(6).max(30)
});


exports.AddPoint = async (req, res) => {
    try {
        const JsonObj = {
            GameId: req.body.GameId,
            GamePoint: req.body.GamePoint,
            GroupId: req.body.GroupId
        }
        var Validation = schema.validate(JsonObj)
        if (!Validation.error) {
            const NewPointEntry = new PointTable(req.body);
            await NewPointEntry.save((error, data) => {
                if (error) {
                    res.send(error)
                }
                else {
                    res.send(data)
                }

            });
        }
        else {
            res.send(Validation.error)
        }

    }
    catch (error) {
        throw error
    }
}


exports.UpdatePointTable = async (req, res) => {
    try {

     var Validation=schemaForUpdate.validate(req.body)
     console.log(Validation.error)
  if(!Validation.error){
    if(req.body){
        PointTable.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
           if (!error) {
               res.send(data)
              
           }
           else {
               res.send(error)
             
   
           }
       });
   

   }
 else
     {

        res.send("nothing to update")
     }
 
  }
  
  else{
    res.send(Validation.error)
  }
   
} catch (error) {
        throw error

    }
}


exports.DisplayPoints=async(req,res)=>{
    try {
   PointTable.find({"Delete":0},(error,data)=>{
    if(!error){
        res.send(data)
    }
    else{
        res.send(error)
    }
  })

        
    } catch (error) {
        throw error
        
    }
}