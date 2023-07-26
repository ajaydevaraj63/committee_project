const express=require('express');
const { addDesig, FindAllDesignation } = require('../controller/Designation.js');
const { AddPoint } = require('../controller/TotlaPoint.js');
var router=express.Router();

 



router.post("/add",addDesig);
router.get("/get",FindAllDesignation);


module.exports = router;
