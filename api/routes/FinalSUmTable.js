const express=require('express');
const { GetInfo } = require('../controller/FinalSumTable');
var router=express.Router();


router.get("/getAll",GetInfo)
module.exports = router;
