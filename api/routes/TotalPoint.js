const express=require('express');

const { AddPoint, getInfoTotalPoint, GetInfo } = require('../controller/TotlaPoint');
let router=express.Router();

 




router.post("/New/Point",AddPoint);
router.get("/Get/Point",GetInfo);


module.exports = router;
