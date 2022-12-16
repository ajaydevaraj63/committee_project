const express=require('express');
var router=express.Router();

 

router.get("/getAll",GetTotalPoints)

router.post("/New/Point",AddPoint);
router.put("/Update/TotalPointTable/:id",UpdatePointTable)

module.exports = router;
