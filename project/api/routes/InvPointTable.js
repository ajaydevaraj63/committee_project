const express=require('express');
const {GetPointsOfAll } = require('../controller/InvPoint.js');
var router=express.Router();


router.get("/getAll",GetPointsOfAll)
module.exports = router;
