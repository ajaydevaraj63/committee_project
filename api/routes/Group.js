const exp = require('express');
const app = exp();
var path = require('path');
const bodyParser = require('body-parser')
//fetch data from the request
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
const router = exp.Router();
const GroupTable = require('../models/Groups.js');
const { updatesingleuser, UpdateGroupOfAllUsers, FindAllGroups, findGroupById, FindUsersOfAGroup, updateGroupDetails } = require('../controller/Group.js');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './assets/data/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date() + file.originalname);
  }
});

var upload = multer({ storage: storage });
router.post("/upload/:id", upload.array("csv"), uploadFiles);

function uploadFiles(req, res) {
  req.body.GroupImage = "/api/" + req.files[0].path
  console.log(req.body);
  console.log(req.files);
  const SaveGroup = new GroupTable(req.body)
  SaveGroup.save((error, data) => {
    if (error) {
      res.send(error)
    }
    else {
      res.send(data)
    }
  })




}



router.put("/UpdatePic/:id", upload.array("csv"), updateProfileImage);

function updateProfileImage(req, res) {
  const ImagePath = "/api/" + req.files[0].path

  console.log(req.files);
  const updateGroup = GroupTable.updateOne({ _id: req.params.id },
    { $set: { GroupImage: ImagePath } },
    (error, data) => {
      if (error) {
        res.send(error)
      }
      else {
        res.send(data)
      }
    })




}
router.put("/Update/Single/UserGroup/:id", updatesingleuser);
router.put("/Update/Multiple/UsersGroup/:id", UpdateGroupOfAllUsers)
router.get("/findAllGroup",FindAllGroups)
router.get("/findGroupById/:id",findGroupById)
router.get("/FindAllUser/inGroup/:id",FindUsersOfAGroup)
router.put("/UpdateGroupDetails/:id",updateGroupDetails)
module.exports = router;




