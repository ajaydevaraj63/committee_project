

const mongoose = require('mongoose')
const bdyp = require('body-parser')
const { urlencoded } = require('body-parser')
const exp = require('express')
const app = exp()

const authroute=require('./routes/auth.js')
const userroute=require('./routes/user.js')
const eventRoute= require('./routes/Event.js')
const groupRoute= require('./routes/Group.js')
app.use(urlencoded({ extended: true }))
app.use(bdyp.json())
// const fileupload=require('express-fileupload')

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


app.get("/api/view",(req,res)=>{
    res.send("in get api")
    
})
// app.post("/group/create",(req,res)=>{

//  console.log(req.files.data)
  
//     // const groups = new createGroup({
//     //     GroupId: req.body.GroupName, GroupImage: "./assets/img1.png" ,GroupType: req.body.GroupType
//     // })

//     // const groups = new posts({
//     //     UserId: req.body.UserId,PostImage:"./assets/img2.png",Tags:req.body.Tags
      
// const groups = new gamepointtable(req.body)
// groups.save((error,data)=>{
//     if(error){
//         res.send(error)
//     }
//     else{
//         res.send(data)
//     }
// })

// })
//middle

app.use("/Auth",authroute);
app.use("/Users",userroute);
app.use("/Event",eventRoute);
app.use("/Group",groupRoute);








app.listen(4006,()=>{
    connect();
    console.log("port is running")
})