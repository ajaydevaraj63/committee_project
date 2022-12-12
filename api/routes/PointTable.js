const express=require('express');
const { NewPopint } = require('../controller/Point.js');
var router=express.Router();



router.post("/NewPoint",NewPopint);
module.exports = router;
