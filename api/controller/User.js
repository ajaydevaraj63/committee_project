const UserTable = require("../models/UserTable.js");
const User = require("../models/UserTable.js");

exports.updateuser = (req, res) => {
  console.log("inide Update")
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    if (error) {
      res.send("error")
    }
    else {
      res.send(data)

    }
  });

}
exports.deleteuser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.status(500).json(error)
    }
    else {
      res.status(200).send("deleted successfully")
    }
  })
}
// exports.displayall = (req, res) => {
//   User.find.toArray((error, data) => {
//     if (error) {
//       res.status(500).json(error)
//     }
//     else {
//       const { password, isAdmin, ...otherdetails } = data;
//       res.send({ "data": otherdetails })
//     }
//   })

// }





exports.FindbyNameAndEmail = (req, res) => {
  console.log("ecec", req.params.id)
  const keyword =
  {
    $and: [
      { username: { $regex: req.query.username } },
      { email: { $regex: req.query.email } }
    ],
  }



  User.find(keyword).find({ _id: { $ne: req.params.id } }, (error, data) => {
    res.send(data)
  })

  console.log("ecec", req.query)





}
exports.displayallusers = (req, res) => {
  User.find({ Delete: "0" }, (error, data) => {
    if (error) {
      res.status(500).json(error)
    }
    else {
console.log(data)
      res.send(data)
    }
  })

}
exports.getGropuMembers = (req, res) => {
  User.find({ "GroupRole": req.body.GroupRole }, (error, data) => {
    if (error) {
      res.status(500).json(error)
    }
    else {
      res.status(200).send(data)
    }
  })
}
exports.paginationRecord = async(req, res, next) => {
 
  let condition = [{"Delete":"0"}];
  let currentPage = 0;
  let pageSize = 0;
  let skip = 0;
  let limit = 0;
  try {
    if (!req.body) {
      let responseObj = {
        "status": "error",
        "msg": "Input is missing.",
        "body": {}
      }
      res.status(500).send(responseObj);
    } else {
      
      if (req.body.UserName) {
        condition.push({'UserName': {'$regex': req.body.UserName,$options:'i'}});

      }
      if (req.body.Designation) {
        condition.push({ "Designation": req.body.Designation });

      }
      if (req.body.currentPage && req.body.pageSize) {

          
       currentPage = req.body.currentPage;
       pageSize = req.body.pageSize; 

       skip = pageSize * (currentPage - 1);
       limit = pageSize;

      }


    await  UserTable.find({ $and: condition }).skip(skip).limit(limit).exec((err, docs) => {
        if (err) {
          let responseObj = {
            "status": "error",
            "msg": "Input is missing.",
            "body": {}
          }
          res.status(500).send(responseObj);
        } else {
          let  responseObj = {
            "status": "success",
            "msg": "Record found.",
            "body": docs
          }
          res.status(200).send(responseObj);
        }
      })
    }
  } catch (error) {
    console.log('Error::', error);
  }
}

exports.AddNewUsersToGroup = (req, res) => {
  User.find({$and:[{ GroupId: "0" },{Delete:0}]}, (error, data) => {
    if (error) {
      res.status(500).json(error)
    }
    else {

      res.send(data)
    }
  })

}

exports.AddNewUsersToCommittee = (req, res) => {
  User.find({$and:[{ CommitteeId: "0" },{Delete:0}]},(error, data) => {   
    if (error) {
      res.status(500).json(error)
    }
    else {

      res.send(data)
    }
  })

}
exports.searchUser = async (req, res) => {
  const { searchQuery } = req.query
  try {
    const value = new RegExp(searchQuery, 'i');
    const searchdata = await User.find({ $or: [{ UserName: value }] })
    res.json({ data: searchdata });

  }
  catch (error) {
    res.status(404).json({ message: error.message })
  }

}

exports.updatecommittee = (req, res) => {

  if (req.body.role == 2) {

    try {
        User.findOneAndUpdate({ CommitteeRole: "2" }, { $set: { CommitteeRole: 0 }}, (error,data) => {

                if (!error) {
                  console.log(data);
                }
                else {
                  console.log(error);
                }

        })
        User.findByIdAndUpdate(req.params.id, { CommitteeRole: req.body.role }, (error, data) => {

                if (!error) {
                  res.send(data);
                }
                else {
                  console.log(error);
                }
          })
        }
    catch (error) {
        res.send(error);
    }
      }

  else if (req.body.role == 1) {

    try {
        User.findOneAndUpdate({ CommitteeRole: "1" }, { $set:  {CommitteeRole: 0 }  }, (error,data) => {

                if (!error) {
                  console.log(data);
                }
                else {
                  console.log(error);
                }
          })

        User.findByIdAndUpdate(req.params.id, { CommitteeRole: req.body.role }, (error, data) => {

                if (!error) {
                  res.send(data);
                }
                else {
                  console.log(error);
                }
          })
        }
    catch (error) {
        res.send(error);
    }

    }
}

exports.CommitteMember = (req, res) => {

  User.find({ CommitteeRole: { $gte: 0 } }, (error, data) => {
    if (!error) {
      res.send(data)
    }
    else {
      res.send(error)
    }
  })
}