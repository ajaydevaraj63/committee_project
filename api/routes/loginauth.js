const router = require("express").Router();
const { request } = require("express");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

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

router.get("/logout", function(req, res) {
 
  res.redirect('http://localhost:3000/User');
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get(
  "/google/callback",  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    console.log(req.user)
    if(req.user.Type==2){
      res.redirect('http://localhost:3000/User');
    }
    if(req.user.Type==1){
      res.redirect('http://localhost:3000/Admin');
    }
  
  
   
  });



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