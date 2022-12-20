const express=require('express');
const app = express();
const path = require("path");
const bdyp = require('body-parser')
app.use(bdyp.json())
const multer=require('multer')
const { allevents, event, eventSearch,getEvents } = require("../controller/Event");
const Event = require("../models/Event");
const bodyParser = require('body-parser');
const router=express.Router();
module.exports=router;
app.use(bodyParser.urlencoded({extended: false}))
const joi=require('@hapi/joi')

const Schema =joi.object().keys({
    EventName: joi.string().alphanum().min(3).max(30),
    EventDescription: joi.string().alphanum().min(3).max(30),
    StartDate: joi.date(),
    EndDate: joi.date(),
    UserId: joi.string()
})



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
      const date = new Date();
      cb(null, file.originalname + "_" + date);
    }

  });

  
let upload = multer({ storage: storage,
  // fileFilter: function(req, file, callback) {
  //   if(path.extname(file.originalname) !== '.csv' || path.extname(file.originalname) !== '.txt') {
  //     return callback(new Error('Only	pdf, ppt files are allowed!'));
  //   }
  //   callback(null, true)
  // }
 });
   
 function postevent (req, res, next) {

  try{
    
    let Validation=Schema.validate(req.body)
    if(!Validation.error){

              const newevent = new Event({
                EventName: req.body.EventName,
                EventDescription: req.body.EventDescription,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                UserId: req.body.UserId
            })
            newevent.File = 'http://localhost:4006/' + req.files[0].path;
            newevent.save((error, data) => {
                    try {

                      res.send(data)

                    }
                    catch (error) {

                      console.log(error);

                    }
          next();
          });
    
    }
    else{
        res.send(Validation.error)
    }
  }
  catch(error){

  }

}

function eventupdation (req, res) {
  try{
    
    let Validation=Schema.validate(req.body)
    if(!Validation.error){
  
  Event.findById( req.params.id, (error, data) => {
      Event.findByIdAndUpdate( req.params.id, { $set: req.body, File: req.files[0].path }, (error, data) => { 
        try{
  
          res.send(data)
  
        }
        catch (error) {
          
          console.log(error);
          res.send(error);
  
        }
      })
    })
  }

  else{
      res.send(Validation.error)
  }
  }
  catch(error){
  
  }
}



router.post("/postevent", upload.array('File') ,postevent);
router.get("/allevent" , allevents);
router.get("/eventSearch", eventSearch);
router.get("/event/:id" , event);
router.put("/updateevent/:id", upload.array('File'), eventupdation)
router.get('/events',getEvents)

module.exports = router;
