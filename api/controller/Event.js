const exp = require("express");
const Event = require("../models/Event");
const Game =  require("../models/GameTable");
const multer = require('multer');
const { RDS } = require("aws-sdk");
const app = exp();
const schedule = require('node-schedule');
  //////////////////akshay/////////////////
  const mongoose=require('mongoose')
const event = require('../models/Event.js');
const { error } = require("@hapi/joi/lib/types/alternatives");




exports.newEvent=((req,res)=>{
    res.send("inside new event")
})

exports.event=((req,res)=>{
    Event.aggregate ([
      
      {
          $lookup: {
              from: "userstables", localField: "UserId", foreignField: "_id", as: "UserList"
          }

      },
    ]).then(result => {
          res.send(result)
    })
  
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
    const events = await Event.find( { Delete: 0 } ).sort({ [sortBy]: sortOrder }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: events, LIMIT: Number(LIMIT), currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT), sortOrder: Number(sortOrder), sortBy });
  }
  catch (error) { 
    res.status(404).json({ message: error.message });

  }
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


exports.eventDelete = (req, res) => {

  Event.findByIdAndUpdate( req.params.id, { Delete: 1 }, (error, data) => { 
  try{
      res.send(data)
  }
  catch (error) {
      
      console.log(error);
      res.send(error);

  }
})
}

// const job = schedule.scheduleJob('*/10 * * * * *', function(){

//   const cd = new Date();
//   const currentdate = cd.getTime()
//   // let cd1 = cd.toLocaleDateString("en-US")
//   // console.log(currentdate);
//   Event.find((error, data) => { 
//     console.log(data);
//       data.forEach(element => { 
       
//           let beginDate = element.StartDate.getTime()
         
//           // let beginDate = element.StartDate.toLocaleDateString("en-US")
//           // console.log("beginDate" + element.StartDate.toLocaleDateString("en-US"));


//           // let closeDate = element.EndDate.toLocaleDateString("en-US")
//           let closeDate = element.EndDate.getTime()
//           // console.log("closeDate" + element.EndDate.toLocaleDateString("en-US"));

//           if( beginDate == currentdate ) {
//             Event.updateOne({_id: element._id.toHexString()}, {$set: {"Status": 1} },(error,data) => {
//                 if(error){
//                   console.log(error);
//                 }
//                 else{
//                   console.log("success -> Status Active")
//                 }
//               })

//           }
//           else if ( currentdate > closeDate ) {  
//            console.log(element);
//             // let result = element.replace("new", ""); 
//             Event.updateOne( element.id, {$set: {"Status": 0} },(error,data) => {
//                   if(error){
//                       console.log(error);
//                   }
//                   else{
//                       console.log("success -> Status Inactive")
//                   }
//                   })
//                   }

//               })
//           })

//       })


exports.getcurrentEvents = (req, res) => { 

    Event.find( {Status: 1}, (error, data) => { 
        if(!error) { 
            res.send(data)
        }
        else { 
            console.log(error);
        }
      })

}