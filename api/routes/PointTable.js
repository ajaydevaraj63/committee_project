const express=require('express');
const { GetPointsOfAll } = require('../controller/InvPoint.js');
const { AddPoint, UpdatePointTable, DisplayPoints, GetInfo } = require('../controller/Point.js');
let router=express.Router();

 

router.get("/getAll",GetPointsOfAll)

router.post("/New/Point",AddPoint);
router.put("/Update/PointTable/:id",UpdatePointTable)
router.get("/DisplayAll/Points",DisplayPoints)
router.get("/getinfo/common",GetInfo)
module.exports = router;
