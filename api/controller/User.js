const User = require("../models/User");

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
    User.find((error,data)=>{
      if(error){
          res.status(500).json(error)
      }
      else{
        const {password,isAdmin,...otherdetails}=data;
          res.send({"data":otherdetails})
      }
    })
  
  }

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