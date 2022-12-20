const exp = require("express");
const Event = require("../models/Event");
const Game =  require("../models/GameTable");
const multer = require('multer');
const { RDS } = require("aws-sdk");
const app = exp();
  //////////////////akshay/////////////////
const event = require('../models/Event.js');
const { error } = require("@hapi/joi/lib/types/alternatives");



exports.newEvent=((req,res)=>{
    res.send("inside new event")
})


exports.getEvents = (req, res) => {

    event.aggregate ([
        
        {$sort: {"createdAt": -1}},
        {
           
            $lookup: {
                from: "users", localField: "UserId", foreignField: "_id", as: "User"
            }


        },
        {$project : { "User.password": 0 }}
    ]).then(result => {
        res.send(result)
    })

}
exports.updateEvent = (req, res) => {
   event.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
      if (error) {
        res.send("error")
      }
      else {
        res.send(data)
  
      }
    });
  
}

/////////////////////////////////////////////////////devanandan//////////////////////////////////////////////////////////




exports.allevents = async (req, res)=> { 
  const { page, LIMIT, sortOrder, sortBy } = req.query 
  try { 

   
    const startIndex = (Number(page) - 1) * Number(LIMIT);
    const total = await Event.countDocuments({});
    const events = await Event.find().sort({ [sortBy]: sortOrder }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: events, LIMIT: Number(LIMIT), currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), sortOrder: Number(sortOrder), sortBy });
  }
  catch (error) { 
    res.status(404).json({ message: error.message });

  }
}
  
 


exports.event = (req, res) => { 


    Event.findById(req.params.id, (error,data) => {

        if(error){
            res.status(500).json(error)
        }
        else{ 
            res.send(data)
        }
    })
}

exports.eventSearch = async (req, res) => {

  const { searchQuery } = req.query 
  const { page, LIMIT, sortOrder, sortBy } = req.query 

  try{

    const startIndex = (Number(page) - 1) * Number(LIMIT);
    const total = await Event.countDocuments({});
    const value =  new RegExp( searchQuery, 'i');
    const events = await Event.find({ $or: [ { EventName: value }, { EventDescription: value } ] }).sort({ [sortBy]: sortOrder }).limit(LIMIT).skip(startIndex);
    res.json({ data: events, LIMIT: Number(LIMIT), currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), sortOrder: Number(sortOrder), sortBy });

  }
  catch (error) { 
    res.status(404).json({ message: error.message })
  }
}

exports.eventwithgame = (req, res) => { 

  Event.find((error, data) => {
    
  })

}