const exp = require('express');
const app = exp();
var path = require('path');
const {validationG}=require('../utils/GroupValidation.js')
const bodyParser = require('body-parser')
//fetch data from the request
const multer = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
const router = exp.Router();
const GroupTable = require('../models/Groups.js');
const { updatesingleuser, UpdateGroupOfAllUsers, FindAllGroups, findGroupById, FindUsersOfAGroup, updateGroupDetails, GroupDelete, FindAllCommittee } = require('../controller/Group.js');
const { verify } = require('crypto');
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  GroupName: Joi.string().alphanum().min(3).max(30).required(),
  GroupType: Joi.string().alphanum().min(3).max(30).required()
 
});



var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date() + file.originalname);
  }
});

var upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    } });
router.post("/create",upload.array("image"), uploadFiles);

async function uploadFiles(req, res) {

try{

  const Validation = schema.validate(req.body);
  if(!Validation.error){

  req.body.GroupImage =  'http://localhost:4006/images/'+req.files[0].filename

  console.log(req.body);
  console.log(req.files);
  const SaveGroup = new GroupTable(req.body)
  await SaveGroup.save((error, data) => {
    if (error) {
      res.send(error)
    }
    else {
      res.send(data)
    }
  })

  }
  else{
    res.send(Validation.error)
  }

}
catch(error){
  throw error
}


}



router.put("/UpdatePic/:id", upload.array("image"), updateProfileImage);

function updateProfileImage(req, res) {
  const ImagePath = 'http://localhost:4006/images/'+req.files[0].filename

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
router.post("/FindCommittee",FindAllCommittee);
router.put("/UpdateGroupDetails/:id",updateGroupDetails)
router.put("/UpdateDelete/:id",GroupDelete)
module.exports = router;




