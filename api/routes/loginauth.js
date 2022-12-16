const router = require("express").Router();
const { request } = require("express");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";
const exp = require('express');
require('dotenv').config();

const app = exp();
const jwt = require('jsonwebtoken');

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("yourToken");
  res.redirect(CLIENT_URL);
});

router.get("/authenticate",(req,res)=>{
  console.log(req)
  var token = req.rawHeaders[15];

  const accesstoken = token.replace("cookie=eyJwYXNzcG9ydCI6e319; cookie.sig=BN_GqSTLJIrst0sjYmXJP7JIKT0; yourToken=", '')
  console.log(accesstoken)
  jwt.verify(accesstoken, process.env.tk1, (err, user) => {

    if (err) {
  
    console.log("error")
    }
    else{
      console.log("success")
    }
   
  
  }

)
})




router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback", passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function (req, res) {
    console.log("1111", req.user)

    const envtoken = process.env.tk1;

    console.log(envtoken)
    const token = jwt.sign({ id: req._id, email: req.Email }, envtoken)

   
    res.cookie('yourToken',token, { maxAge: 900000, httpOnly: true })


    if (req.user.Type == 2) {
      res.redirect('http://localhost:3000/User');
    }
    else if (req.user.Type == 1) {
      res.redirect('http://localhost:3000/Admin');
    }
    else {
      res.redirect('http://localhost:3000/Committee');
    }


  }

  // (req, res) => {
  //   console.log(req.user)
  //     res.redirect('http://localhost:3000/Admin');
  // }



);



router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router

