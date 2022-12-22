const express = require("express");
const { displayall, updateuser, deleteuser, FindbyNameAndEmail, displayallusers, getGropuMembers, paginationRecord, pagination, AddNewUsersToGroup, searchUser, updatecommittee, committeemember, AddNewUsersToCommittee, CommitteMember } = require("../controller/User");
const UserSchema = require('../models/UserTable')
const { verifytoken, verifyuser, verifyadmin } = require("../utils/verifytoken");
const router = express.Router();
const multer = require('multer');
const auth = require("../middleware/auth");
const app=express();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date() + file.originalname);
    }
});
app.use(express.static(__dirname + '/api/images'));
let upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    } });

router.put("/UpdatePic/:id", upload.array("image"), updateProfileImage);

function updateProfileImage(req, res) {
    const ImagePath = 'http://localhost:4006/images/'+req.files[0].filename

    console.log(req.files);
        UserSchema.updateOne({ _id: req.params.id },
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
// router.get("/:id",displayall)
router.get("/Display/FilteredUser",paginationRecord)
router.put("/put",updateuser)
router.put("/UpdateUser/:id", updateuser)
router.put("/UpdateUser/GroupRole/:id", updateuser)
router.put("/UpdateUser/Group/:id", updateuser)
router.delete("/delete",deleteuser)
router.get("/email/:id", FindbyNameAndEmail)
router.get('/display/All/user', displayallusers)
router.get('/group/members', getGropuMembers);
router.get("/Display/AddUsersToNewGroup",AddNewUsersToGroup)
router.get("/Display/AddUsersToNewCommittee",AddNewUsersToCommittee)
router.get("/searchuser", searchUser)
router.get("/getCommitteMember",CommitteMember)
router.put("/committeeupdate/:id",updatecommittee)


module.exports = router