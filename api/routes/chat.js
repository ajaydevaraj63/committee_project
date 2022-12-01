const { json } = require('body-parser');
const express=require('express');
const { newchat, getchat } = require('../controller/chatc.js');
var router=express.Router();
const { verifyuser, verifyadmin } = require('../utils/verifytoken.js');


router.post("/:id",newchat);
router.get("/:userId", getchat);
module.exports=router;