const express=require('express');
const app = express();
const path = require("path");
const bdyp = require('body-parser')
app.use(bdyp.json())
const multer=require('multer')
const { allevents, event, eventSearch, getEvents, eventDelete, getcurrentEvents, geteventswithgroup, getcurrenteventswithgroup } = require("../controller/Event");
const Event = require("../models/Event");
const bodyParser = require('body-parser');
const router=express.Router();
module.exports=router;
app.use(bodyParser.urlencoded({extended: false}))
const dotenv = require('dotenv');
dotenv.config();
//////////////////////
const devUrl=process.env.devUrl
const joi=require('@hapi/joi')
const Schema =joi.object().keys({
    EventName: joi.string().alphanum().min(3).max(30),
    EventDescription: joi.string().min(3).max(30),
    StartDate: joi.date(),
    EndDate: joi.date(),
    UserId: joi.string().alphanum()
})
app.use(express.static(__dirname + '/api/images'));
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
  fileFilter: function(req, file, callback) {
    let ext = path.extname(file.originalname);
    if(ext !== '.svg' && ext !== '.txt') {
              return callback(new Error('Only	pdf, ppt files are allowed!'));

    }
    callback(null, true)

  }
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
            newevent.File = devUrl+'images/' + req.files[0].path;
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
  const date = new Date();

  try{
    
    let Validation=Schema.validate(req.body)
    if(!Validation.error){
  
                Event.findById( req.params.id, (error, data) => {
                  const sd = data.StartDate;
                  if ( sd < date ) {
                    Event.findByIdAndUpdate( req.params.id, { $set: req.body, File: req.files[0].path }, (error, data) => { 
                      try{
                
                        res.send(data)
                
                      }
                      catch (error) {
                        
                        console.log(error);
                        res.send(error);
                
                      }
                    })
                  }
                  else { 
                    res.send("Event Started Further Updation Not Possible")
                  }
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
router.get("/event" , event);
router.put("/updateevent/:id", upload.array('File'), eventupdation)
router.get('/events',getEvents)
router.get('/currentevents',getcurrentEvents)
router.delete('/eventDelete/:id',eventDelete)
router.get("/eventswithgroupame", geteventswithgroup)
router.get("/currenteventswithgroupame", getcurrenteventswithgroup)



module.exports = router;
