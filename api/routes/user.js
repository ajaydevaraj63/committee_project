const express = require("express");
const { displayall, updateuser, deleteuser, FindbyNameAndEmail, displayallusers, getGropuMembers, paginationRecord, pagination } = require("../controller/User");
const UserSchema = require('../models/UserTable')
const { verifytoken, verifyuser, verifyadmin } = require("../utils/verifytoken");
const router = express.Router();
const multer = require('multer');
const app=express();

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date() + file.originalname);
    }
});
app.use(express.static(__dirname + '/api/images'));
var upload = multer({ storage: storage });

router.put("/UpdatePic/:id", upload.array("image"), updateProfileImage);

function updateProfileImage(req, res) {
    const ImagePath = 'http://localhost:4006/images/'+req.files[0].filename

    console.log(req.files);
    const UserUpdate = UserSchema.updateOne({ _id: req.params.id },
        { $set: { UserImage: ImagePath} },
        (error, data) => {
            if (error) {
                res.send(error)
            }
            else {
                res.send(data)
            }
        })
}
router.get("/:id", verifyuser, displayall)
router.get("/Users/Get",paginationRecord)
router.put("/put", verifyuser, updateuser)
router.put("/UpdateUser/:id", updateuser)
router.put("/UpdateUser/GroupRole/:id", updateuser)
router.put("/UpdateUser/Group/:id", updateuser)
router.delete("/delete", verifyuser, deleteuser)
router.get("/email/:id", FindbyNameAndEmail)
router.get('/display/All/user', displayallusers)
// router.get( '/OwnGroup/User',OwnGroupMembers);
router.get('/group/members', getGropuMembers);
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
module.exports = router