
const exp = require('express');
const { newauth, newlogin, csvAuth, googlelogin, googleopen, manuallyAddUser, updateUserType, deleteUser } = require('../controller/Auth');
const {  register } = require('../utils/UserValidation');
const router=exp.Router();
router.post("/post",newauth)
router.post("/login",newlogin)
router.post("/csv/Upload",csvAuth)
router.get("/send",googlelogin)
router.post("/add/user/manually",register,manuallyAddUser)
router.get( '' ,googleopen)
router.post("/update/user/type/:id",updateUserType)
router.post("/delete/user/:id",deleteUser)
module.exports = router;