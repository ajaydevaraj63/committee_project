const GroupSchema = require('../models/Groups.js')
const UserSchema = require('../models/UserTable.js')
const joi=require('@hapi/joi')
const Schema =joi.object().keys({
    GroupName: joi.string().alphanum().min(3).max(30),
    GroupType: joi.string().alphanum().min(3).max(30)
})
exports.updatesingleuser = (req, res) => {
    UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
        if (error) {
            res.send("error")
        }
        else {
            res.send(data)

        }
    });

}
exports.UpdateGroupOfAllUsers = async (req, res) => {
    const ObjJson = req.body
    const GroupID = req.params.id



    try {
        for (const element of ObjJson) {
            await UserSchema.findOneAndUpdate(
                { _id: element },
                { $set: { GroupId: GroupID } }
            )
            console.log(element)
        }
        res.send("saved")
    } catch (err) {
        console.error(err)
    }


}
exports.FindAllGroups=(req,res)=>{
    GroupSchema.find({"Delete": "0"},(error,data)=>{
        res.send(data)
    })
}
exports.findGroupById=(req,res)=>{
    GroupSchema.findById(req.params.id,(error,data)=>{
        res.send(data)
    })
}
exports.FindUsersOfAGroup=(req,res)=>{
    UserSchema.find({GroupId:req.params.id},(error,data)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send(data)
        }
    })
}
exports.updateGroupDetails=async(req,res)=>{
  
try{
    let Validation=Schema.validate(req.body)
    if(!Validation.error){

  await  GroupSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
    if (error) {
        res.send("error")
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

}
}
exports.GroupDelete=async(req,res)=>{
  
    try{
      
        if(req.body){
    
      await  GroupSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
        if (error) {
            res.send("error")
        }
        else {
            res.send(data)
    
        }
    })
    
        }
        else{
            res.send("error")
        }
    }
    catch(error){
    
    }
    }