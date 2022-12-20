const express=require('express');

const { AddPoint, getInfoTotalPoint } = require('../controller/TotlaPoint');
let router=express.Router();

 



router.post("/New/Point",AddPoint);
router.get("/Get/Point",getInfoTotalPoint);


module.exports = router;
