const exp = require("express");
const Game = require("../models/GameTable");
const GamePoint=require('../models/GamePointTable')
const app = exp();
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
const schedule = require('node-schedule');
const { updateMany, countDocuments } = require("../models/GameTable");
app.use(bdyp.json())
app.use(bodyParser.urlencoded({extended: false}))
const mongoose = require('mongoose');


exports.game = (req, res) => {
            
        GamePoint.aggregate([
            {
                $match: {
                    "GameId" : mongoose.Types.ObjectId(req.params.id)
                }
            },

            {
                $lookup: {
                    from: "groups", localField: "GroupId", foreignField: "_id", as: "grouplist"
                }
    
    
            }
        ]).exec((error, result)   =>  {
    
            try { res.send(result) } 
            catch(error) { console.log(error); }
    
        });
}



exports.allgames = async (req, res)=> { 
    const { page, LIMIT, sortOrder, sortBy } = req.query 
    try { 
  

      const startIndex = (Number(page) - 1) * Number(LIMIT);
      const total = await Game.countDocuments({});
      const events = await Game.find( { Delete: 0 } ).sort({ [sortBy]: sortOrder }).limit(LIMIT).skip(startIndex);
      res.status(200).json({ data: events, LIMIT: Number(LIMIT), currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), sortOrder: Number(sortOrder), sortBy });
    }
    catch (error) { 
      res.status(404).json({ message: error.message });
  
    }
}


exports.gameactivation = (req, res) => {
    
    if(req.body.Status ==  1) {

        const currentdate = new Date();
        Game.findByIdAndUpdate( req.params.id, { $set: req.body, StartDate: currentdate }, (error, data) => {
            try { 

                res.send(data)

            }
            catch (error) { 

                res.send(error)

            }
        })
    }
    else { 
        
        Game.findByIdAndUpdate( req.params.id, { $set:  req.body, EndDate: currentdate }, (error, data) => {
            if (error){

                res.send(error)

            }  
            else {
                res.send(data)
            } 
        })
    }

}

const job = schedule.scheduleJob('*/10 * * * * *', function(){
    const cd = new Date();
    const currentdate = cd.setHours(0, 0, 0, 0);
    Game.find((error, data) => { 
        data.forEach(element => { 

            let beginDate = element.StartDate.setHours(0, 0, 0, 0);

            let closeDate = element.EndDate.setHours(0, 0, 0, 0);


            if( beginDate == currentdate ) {
                
                Game.updateOne({"_id":element._id}, {"Status": "1" },(error,data) => {
                  if(error){
                    console.log(error);
                  }
                  else{
                    console.log("success -> Game Status Active")
                    
                  }
                })

            }
            else if ( currentdate > closeDate ) {  
                
                Game.updateOne({"_id":element._id}, {"Status": "0" },(error,data) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log("success -> Game Status Inactive")
                    }
                    })
                    }

                })
            })

        })


exports.gameSearch = async (req, res) => {
    
    const { searchQuery } = req.query 
    const { page, LIMIT, sortOrder, sortBy } = req.query 
  
    try{
  
      const startIndex = (Number(page) - 1) * Number(LIMIT);
      const total = await Game.countDocuments({});
      const value =  new RegExp( searchQuery, 'i');
      const games = await Game.find({ $or: [ { GameName: value }, { GameDesc: value } ] }).sort({ [sortBy]: sortOrder }).limit(LIMIT).skip(startIndex);
      res.json({ data: games, LIMIT: Number(LIMIT), currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), sortOrder: Number(sortOrder), sortBy });
  
    }
    catch (error) { 
      res.status(404).json({ message: error.message })
    }

}
exports.FindGamesWithEventId=(async(req,res)=>{
    try {
        await Game.find(req.body,(data,error) =>{
            if(!error){
                res.send(data)
            }
            else{
                res.send(error)
            }

        })
    } catch (error) {
        
    }
})

exports.deleteGame = (req, res) => {

        Game.findByIdAndUpdate( req.params.id, { $set: req.body }, (error, data) => { 
        try{
            res.send(data)
        }
        catch (error) {
            
            console.log(error);
            res.send(error);
    
        }
})
}

exports.onegame = (req, res) => { 
    Game.findById(req.params.id, (error, data) => { 
        try { 
                res.send(data)
        }
        catch( error ){
            console.log(error);

        }
    })
}
