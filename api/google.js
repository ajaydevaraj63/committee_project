const express = require("express");
const cookieSession = require("cookie-session"); //npm i  express pasport cors  cookie-session
const cors = require("cors");
 require("./passport.js");
const passport = require("passport");
const authRoute = require("./routes/loginauth");
const app = express();
  
////////////////verifylogin/////////////
const CLIENT_ID="948869378175-2j4gta2nuea49a3slpap3fnnj4jqcfqm.apps.googleusercontent.com"
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});
app.use(cors({origin:'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile&client_id=948869378175-2j4gta2nuea49a3slpap3fnnj4jqcfqm.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow'}))

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use("/auth", authRoute);

app.listen("5000", async() => {
  try {
    
  console.log("Server is running!");

    
  } catch (error) {
    throw error
    
  }});
