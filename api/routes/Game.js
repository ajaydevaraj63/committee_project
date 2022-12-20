const express=require('express');
const app = express();
const path = require("path");
const multer=require('multer')
const Game = require('../models/GameTable')
const { allgames, game, gameactivation, gameSearch, FindGamesWithEventId } = require("../controller/Game");
const router=express.Router();
module.exports=router;
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bdyp.json());
app.use(bodyParser.urlencoded({extended: false}));
const joi=require('@hapi/joi')
const Schema =joi.object().keys({
  GameName: joi.string().alphanum().min(3).max(30),
  GameDesc: joi.string().min(3).max(30),
  StartDate: joi.date(),
  EndDate: joi.date(),
  UserId: joi.string().alphanum(),
  EventId: joi.string().alphanum()
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
  //   if(path.extname(file.originalname) !== '.pdf' || path.extname(file.originalname) !== '.text') {
  //     return callback(new Error('Only	pdf, text files are allowed!'));
  //   }
  //   callback(null, true)
  // }
 });

function postgame(req, res, next) {

  try{
    
    let Validation=Schema.validate(req.body)
    if(!Validation.error){

              const newgame = new Game({

                GameName: req.body.GameName,
                GameDesc: req.body.GameDesc,
                UserId: req.body.UserId,
                StartDate: req.body.StartDate,
                EndDate: req.body.EndDate,
                EventId: req.body.EventId
                
            })
            newgame.RulesPdf = req.files[0].path
            newgame.save((error, data) => {
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

function gameupdation (req, res) {
  const date = new Date();
  try{
  
    let Validation=Schema.validate(req.body)
    if(!Validation.error){
        Game.findById( req.params.id, (error, data) => {
        const sd = Game.StartDate;
        if ( sd < date ) {

              Game.findByIdAndUpdate( req.params.id, { $set: req.body, RulesPdf: req.files[0].path }, (error, data) => { 
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

        res.send("Game Started Further Updation Not Possible")

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


router.post("/postgame", upload.array('RulesPdf'), postgame);
router.put("/activategame/:id", gameactivation)
router.put("/updategame/:id", upload.array('RulesPdf'), gameupdation)
router.get("/allgame" , allgames);
router.get("/game/:id" , game);
router.get("/gameSearch", gameSearch);
router.get("/EventId",FindGamesWithEventId);


module.exports=router;