const express=require('express');
const { AddPoint, UpdatePointTable, DisplayPoints, GetInfo } = require('../controller/Point.js');
var router=express.Router();



router.post("/New/Point",AddPoint);
router.put("/Update/PointTable/:id",UpdatePointTable)
router.get("/DisplayAll/Points",DisplayPoints)
router.get("/getinfo/common",GetInfo)
module.exports = router;
