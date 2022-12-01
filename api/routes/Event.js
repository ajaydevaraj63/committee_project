const express=require('express');
const { newEvent } = require('../controller/Event');
var router=express.Router();
router.post("/event",newEvent);
module.exports=router;
