const express=require('express');
const { AddPoint, UpdatePointTable, DisplayPoints } = require('../controller/Point.js');
var router=express.Router();



router.post("/New/Point",AddPoint);
router.put("/Update/PointTable/:id",UpdatePointTable)
router.get("/DisplayAll/Points",DisplayPoints)
module.exports = router;
