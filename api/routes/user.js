const express=require("express");
const { displayall, updateuser, deleteuser, FindbyNameAndEmail, displayallusers, getGropuMembers } = require("../controller/User");
const  {verifytoken, verifyuser, verifyadmin}  = require("../utils/verifytoken");
const router=express.Router();

router.get("/:id",verifyuser,displayall)
router.put("/put",verifyuser,updateuser)
router.put("/UpdateUser/:id",updateuser)
router.put("/UpdateUser/GroupRole/:id",updateuser)
router.put("/UpdateUser/Group/:id",updateuser)
router.delete("/delete",verifyuser,deleteuser)
router.get("/email/:id",FindbyNameAndEmail)
router.get( '/display/All/user' ,displayallusers)
// router.get( '/OwnGroup/User',OwnGroupMembers);
router.get( '/group/members',getGropuMembers);
// router.get("/checkauthentication",verifytoken,(req,res)=>{
 
//   res.send("Hello user you are authenticated")

// }
     
// )     
// router.get("/checkuser/:id",verifyuser,(req,res)=>{
 
//     res.send("Hello user you are authenticated and you can delete")
  
//   }
     
//   )
//   router.get("/checkadmin/:id",verifyadmin,(req,res)=>{
 
//     res.send("Hello admin you are authenticated and you can delete")
  
//   }
     
//   )
module.exports=router