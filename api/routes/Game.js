const express=require('express');
const app = express();
const path = require("path");
const multer=require('multer')
const Game = require('../models/GameTable')
const { allgames, game, gameactivation, gameSearch } = require("../controller/Game");
const router=express.Router();
module.exports=router;
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bdyp.json());
app.use(bodyParser.urlencoded({extended: false}));


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'http://localhost:4006/uploads');
    },
    filename: (req, file, cb) => {
      const date = new Date();
      cb(null, file.originalname + "_" + date);
    }
  });


let upload = multer({ storage: storage });

function postgame(req, res, next) {
  
    const newgame = new Game({

        GameName: req.body.GameName,
        GameDesc: req.body.GameDesc,
        UserId: req.body.UserId,
        StartDate: req.body.StartDate,
        EndDate: req.body.EndDate

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

  function gameupdation (req, res) {
    const date = new Date();
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
    } )
}


router.post("/postgame", upload.array('RulesPdf'), postgame);
router.put("/activategame/:id", gameactivation)
router.put("/updategame/:id", upload.array('RulesPdf'), gameupdation)
router.get("/allgame" , allgames);
router.get("/game/:id" , game);
router.get("/gameSearch", gameSearch);


module.exports=router;