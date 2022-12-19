///google login/////////
const cookieSession = require("cookie-session"); //npm i  express pasport cors  cookie-session
const cors = require("cors");
require("./passport.js");
const passport = require("passport");
const loginRoute = require("./routes/loginauth");
const CLIENT_ID = "948869378175-2j4gta2nuea49a3slpap3fnnj4jqcfqm.apps.googleusercontent.com"
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const session = require('express-session')
const TotalPoint=require('./routes/TotalPoint.js')
const Desig=require('./routes/Designation.js')

//////////////////////

const mongoose = require('mongoose')
const bdyp = require('body-parser')
const { urlencoded } = require('body-parser')
const exp = require('express')
const app = exp()
app.use("/images", exp.static('images'))
app.use("/csv", exp.static('csv'))
const authroute = require('./routes/auth.js')
const MongoStore = require('connect-mongo');
const userroute = require('./routes/user.js')
const eventRoute = require('./routes/Event.js')
const groupRoute = require('./routes/Group.js')
const PointMgmnt = require('./routes/PointTable.js')
const gameRoute =require('./routes/Game.js');
app.use(urlencoded({ extended: true }))
app.use(bdyp.json())

////////////google Login////////////
 app.use(
   cookieSession({ name: "cookie", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////

const connect = async () => {
    try {


        await mongoose.connect("mongodb+srv://ajay1600:ajaykumard@cluster0.wpagudr.mongodb.net/newdb", { useNewUrlParser: true }, (err, db) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Connected to mongoDB");
            }
        });
    }
    catch (error) {
        throw error;

    }
}
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST, PATCH, DELETE, OPTIONS");
    next();
});
app.use(cors());

mongoose.connection.on("disconnected", () => {
    console.log("disconnected")
})
mongoose.connection.on("connected", () => {
    console.log("connected")
})


app.get("/api/view", (req, res) => {
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

app.use("/Auth", authroute);
app.use("/Auth/Googlogin", loginRoute);
app.use("/Users", userroute);
app.use("/Event", eventRoute);
app.use("/Group", groupRoute);
app.use("/Point", PointMgmnt);
app.use("/game",gameRoute);
app.use("/TotalPoint",TotalPoint);
app.use("/Designation",TotalPoint);








app.listen(4006, () => {
    connect();
    console.log("port is running")
})