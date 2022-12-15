const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const UserTable = require("./models/UserTable.js");
const mng=require('mongoose')
const exp=require('express')
const app=exp();

const GOOGLE_CLIENT_ID =
  "948869378175-2j4gta2nuea49a3slpap3fnnj4jqcfqm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

GITHUB_CLIENT_ID = "your id";
GITHUB_CLIENT_SECRET = "your id";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/Googlogin/google/callback",
    },
  async  function (accessToken, refreshToken, profile,email, done) {
    try{

      console.log(email._json.email)
     
   let User=await UserTable.findOne({"Email":email._json.email})
   if(User){
         done(null, User);
     
        }


    }
    catch(error){
      throw(error)
    }
     
  
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (req,accessToken, refreshToken, profile, done) {
      done(null, profile);//done is given to skip db operation instead we use cb
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user , done) => {
      done(null , user);
  })
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });
    