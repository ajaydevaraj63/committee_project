const express=require('express');

const { AddPointAll, GetInfo, GetInfoTotalpointeqGroup, findByGIdAndEvntId, updateAll } = require('../controller/TotlaPoint');
let router=express.Router();

 




router.post("/New/Point",AddPointAll);
router.post("/Get/Point",GetInfo);
router.post("/Get/PointOfEvent",GetInfoTotalpointeqGroup);
router.post("/Get/EventId/GroupId",findByGIdAndEvntId);
router.post("/Get/Update/:id", updateAll);

module.exports = router;
