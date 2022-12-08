const User = require("../models/UserTable.js");

exports.updateuser= (req,res)=>{
    const updatemodel= User.findByIdAndUpdate(req.params.id,{$set:req.body},(error,data)=>{
            if(error){
                res.send("error")
            }
            else{
                res.send(data)

            }
        });
    
}
exports.deleteuser=(req,res)=>{
    User.findByIdAndDelete(req.params.id,(error)=>{
        if(error){
            res.status(500).json(error)
        }
        else{
            res.status(200).send("deleteted successfully")
        }
    })
}
exports.displayall=(req,res)=>{
    User.find.toArray((error,data)=>{
      if(error){
          res.status(500).json(error)
      }
      else{
        const {password,isAdmin,...otherdetails}=data;
          res.send({"data":otherdetails})
      }
    })
  
  }
//   exports.OwnGroupMembers=(req,res)=>{
//     const sort = { GroupRole: 1 };
//    User.find({ $query: { "GroupId": req.body.GroupId}, $orderby: { GroupRole : -1 } },(function(err,result){
//     res.send(result)

//    }))
 
// }
  
  



  exports.FindbyNameAndEmail=(req,res)=>{
    console.log("ecec",req.params.id)
    const keyword =
    {
        $and: [
          { username: { $regex: req.query.username} },
          { email: { $regex: req.query.email} }
        ],
      }


    //   { $or: [ { username: req.query.username }, { email:req.query.email } ] }
  
     User.find(keyword ).find({ _id: { $ne:req.params.id } },(error,data)=>{
        res.send(data)
     })

    console.log("ecec",req.query)
 
   
   
  
   
  }
  exports.displayallusers=(req,res)=>{
    User.find({Delete:"0"},(error,data)=>{
      if(error){
          res.status(500).json(error)
      }
      else{
      
          res.send(data)
      }
    })
  
  }
  exports.getGropuMembers=(req,res)=>{
    User.find({"GroupRole":req.body.GroupRole},(error,data)=>{
        if(error){
            res.status(500).json(error)
        }
        else{
            res.status(200).send(data)
        }
    })
}