
var multer = require('multer');
var path = require('path');
var csv = require('csvtojson');


const mongoose = require('mongoose')
const bdyp = require('body-parser')
const { urlencoded } = require('body-parser')
const exp = require('express')
const app = exp()
const gamepointtable=require("./models/GamePointTable.js");
const authroute=require('./routes/auth.js')
const userroute=require('./routes/user.js')
const eventRoute= require('./routes/Event.js')
app.use(urlencoded({ extended: true }))
app.use(bdyp.json())




////////////csv//////////////////

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './assets/data/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  var uploads = multer({ storage: storage });
  






const connect=async ()=>{
    try{

        
        await mongoose.connect("mongodb+srv://ajay1600:ajaykumard@cluster0.wpagudr.mongodb.net/newdb", { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Connected to mongoDB");
            }
        });
    }
    catch(error){
        throw error;
    
    }
}
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


mongoose.connection.on("disconnected",()=>{
    console.log("disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("connected")
})

app.post("/api/upload/formdata",(req,res)=>{
   console.log(req.File)
   res.send(req.body)
})


app.post('/uploads', uploads.single('csv'), (req, res) => {
    //convert csvfile to jsonArray   
    console.log(req.file)
    csv()
      .fromFile(req.file.path)
      .then((jsonObj) => {
        console.log(jsonObj);
       res.send(jsonObj)
     
      });
  });
  




app.listen(4006,()=>{
    connect();
    console.log("port is running")
})