const express=require("express");
const { displayall, updateuser, deleteuser, FindbyNameAndEmail } = require("../controller/User");
const  {verifytoken, verifyuser, verifyadmin}  = require("../utils/verifytoken");
const router=express.Router();

router.get("/:id",verifyuser,displayall)
router.put("/put",verifyuser,updateuser)
router.delete("/delete",verifyuser,deleteuser)
router.get("/email/:id",FindbyNameAndEmail)
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