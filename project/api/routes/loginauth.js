const router = require("express").Router();
const { request } = require("express");
const passport = require("passport");

const CLIENT_URL = "https://dev-recreation.innovaturelabs.com/";
const exp = require('express');
require('dotenv').config();

const app = exp();
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const UserTable = require("../models/UserTable");
const { verifyUser } = require("../middleware/auth");

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

router.get("/authenticate",verifyUser,(req,res)=>{
  console.log("authenticate")

})

router.post("/LoginCheck",(req,res) => {
   console.log(req.body)

 UserTable.findOne(req.body,(error,data)=>{

  res.send({"data":data})
 })
 
});




module.exports = router

