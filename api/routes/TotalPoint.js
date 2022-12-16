const express=require('express');
const { AddPoint } = require('../controller/TotlaPoint');
var router=express.Router();

 



router.post("/New/Point",AddPoint);


module.exports = router;
