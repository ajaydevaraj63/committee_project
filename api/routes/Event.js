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


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
      const date = new Date();
      cb(null, file.originalname + "_" + date);
    }

  });

  
let upload = multer({ storage: storage });
   
function postevent (req, res, next) {


  
    const newevent = new Event({

        EventName: req.body.EventName,
        EventDescription: req.body.EventDescription,
        UserId: req.body.UserId

    })

    console.log(req.files);
    newevent.File = 'http://localhost:4006/images/'+req.files[0].filename
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

function eventupdation (req, res) {
  
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



router.post("/postevent", upload.array('File') ,postevent);
router.get("/allevent" , allevents);
router.get("/eventSearch", eventSearch);
router.get("/event/:id" , event);
router.put("/updateevent/:id", upload.array('File'), eventupdation)
router.get('/events',getEvents)

module.exports = router;
