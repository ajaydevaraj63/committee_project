const express=require('express');
const app = express();
const path = require("path");
const multer=require('multer')
const Post = require('../models/Post')
const { allposts, post, deletepost } = require("../controller/Post");
const router=express.Router();
module.exports=router;
const bdyp = require('body-parser');
const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bdyp.json());
app.use(bodyParser.urlencoded({extended: false}));
const joi=require('@hapi/joi')
const Schema =joi.object().keys({
    PostDescription: joi.string().min(3).max(30),
    UserId: joi.string().alphanum()
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
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

function postImage(req, res, next) {

    try{
    
        let Validation=Schema.validate(req.body)
        if(!Validation.error){

                const newpost = new Post({

                    PostDescription: req.body.PostDescription,
                    UserId: req.body.UserId

                })

                newpost.PostImage = 'http://localhost:4006/' + req.files[0].path


                newpost.save((error, data) => {
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

function postupdation (req, res) {
    try{
  
        let Validation=Schema.validate(req.body)
        if(!Validation.error){
                Post.findById( req.params.id, (error, data) => {

                    Post.findByIdAndUpdate( req.params.id, { $set: req.body, PostImage: req.files[0].path }, (error, data) => { 
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









router.post("/postimage", upload.array('PostImage'), postImage);
router.put("/updatepost/:id", upload.array('PostImage'), postupdation)
router.get("/allposts" , allposts);
router.get("/post/:id" , post);
router.delete("/deletepost/:id", deletepost)



module.exports=router;