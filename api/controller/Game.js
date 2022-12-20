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




exports.game = (req, res) => {

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
}


exports.allgames = async (req, res)=> { 
    const { page, LIMIT, sortOrder, sortBy } = req.query 
    try { 
  
      // const LIMIT = 5;
      const startIndex = (Number(page) - 1) * Number(LIMIT);
      const total = await Game.countDocuments({});
      const events = await Game.find().sort({ [sortBy]: sortOrder }).limit(LIMIT).skip(startIndex);
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
    const currentdate = cd.getTime()
    // let cd1 = cd.toLocaleDateString("en-US")
    // console.log(currentdate);
    Game.find((error, data) => { 
        data.forEach(element => { 

            let beginDate = element.StartDate.getTime()
            // let beginDate = element.StartDate.toLocaleDateString("en-US")
            // console.log("beginDate" + element.StartDate.toLocaleDateString("en-US"));


            // let closeDate = element.EndDate.toLocaleDateString("en-US")
            let closeDate = element.EndDate.getTime()
            // console.log("closeDate" + element.EndDate.toLocaleDateString("en-US"));

            if( beginDate == currentdate ) {
                Game.updateOne({"_id":element._id}, {"Status": "1" },(error,data) => {
                  if(error){
                    console.log(error);
                  }
                  else{
                    // console.log("success -> Status Active")
                  }
                })

            }
            else if ( currentdate > closeDate ) {  
                Game.updateOne({"_id":element._id}, {"Status": "0" },(error,data) => {
                    if(error){
                        console.log(error);
                    }
                    else{
                        // console.log("success -> Status Inactive")
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