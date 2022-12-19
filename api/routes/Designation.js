const express=require('express');
const { addDesig } = require('../controller/Designation');
const { AddPoint } = require('../controller/TotlaPoint');
var router=express.Router();

 



router.post("/add",addDesig);
router.get("/add",FindAllDesignation);


module.exports = router;
