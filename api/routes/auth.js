
const exp = require('express');
const { newauth, newlogin, csvAuth, googlelogin, googleopen } = require('../controller/Auth');
const router=exp.Router();
router.post("/post",newauth)
router.post("/login",newlogin)
router.post("/csv/Upload",csvAuth)
router.get("/send",googlelogin)
router.get( '' ,googleopen)
module.exports = router;