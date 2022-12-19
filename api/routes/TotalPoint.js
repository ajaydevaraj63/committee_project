const express=require('express');
const { getInfo } = require('../controller/Point');
const { AddPoint } = require('../controller/TotlaPoint');
let router=express.Router();

 



router.post("/New/Point",AddPoint);
router.get("/Get/Point",getInfo);


module.exports = router;
