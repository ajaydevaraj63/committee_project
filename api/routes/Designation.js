const express=require('express');
const { addDesig, FindAllDesignation } = require('../controller/Designation');
const { AddPoint } = require('../controller/TotlaPoint');
var router=express.Router();

 



router.post("/add",addDesig);
router.get("/get",FindAllDesignation);


module.exports = router;
