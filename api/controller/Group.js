const GroupSchema = require('../models/Groups.js')
const UserSchema = require('../models/UserTable.js')
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
        for (let i = 0; i < ObjJson.length; i++) {
            await UserSchema.findOneAndUpdate(
                { _id: ObjJson[i] },
                { $set: { GroupId: GroupID } }
            )
            console.log(ObjJson[i])
        }
        res.send("saved")
    } catch (err) {
        console.error(err)
    }


}
exports.FindAllGroups=(req,res)=>{
    GroupSchema.find((error,data)=>{
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