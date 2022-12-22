const GroupSchema = require('../models/Groups.js')
const UserSchema = require('../models/UserTable.js')
const joi = require('@hapi/joi')
const UserTable = require('../models/UserTable.js')
const Schema = joi.object().keys({
    GroupName: joi.string().max(30),
    GroupType: joi.string().max(30)
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

exports.UpdateCommitteeOfAllUsers = async (req, res) => {
    const ObjJson = req.body
    const CommitteeId = req.params.id



    try {
        for (const element of ObjJson) {
            await UserSchema.findOneAndUpdate(
                { _id: element },
                { $set: { CommitteeId: CommitteeId } }
            )
            console.log(element)
        }
        res.send("saved")
    } catch (err) {
        console.error(err)
    }


}
exports.FindAllCommittee = (req, res) => {
    GroupSchema.find(req.body, (error, data) => {
        res.send(data)
    })
}
exports.FindAllGroups = (req, res) => {
    GroupSchema.find({ "Delete": "0" }, (error, data) => {
        res.send(data)
    })
}
exports.findCommity = (req, res) => {
    UserTable.find({ Type: { $eq: 1 } }, (error, data) => {
        if (!error) {
            res.send(data)

        }
        else {
            res.send(error)
        }
    })
}
exports.findGroupById = (req, res) => {
    GroupSchema.findById(req.params.id, (error, data) => {
        res.send(data)
    })
}
exports.FindUsersOfAGroup = (req, res) => {
    UserSchema.find({ $and: [{ GroupId: req.params.id }, { Delete: 0 }] }, (error, data) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send(data)
        }
    })
}
exports.FindUsersOfACommitteeDelete = (req, res) => {

    GroupSchema.findById(req.params.id, (eror, data) => {
        if (data.GroupType == 1) {
            UserSchema.find({ CommitteeId: req.params.id }).select('id').then((response) => {
                if (response) {
                    UserSchema.updateMany({ _id: { $in: response } },
                        { $set: [{ CommitteeId: 0 }, { Type: 0 }] }).then((res) => {
                            console.log("wwwww", res)
                        })
                }

            })
            console.log("ddd", req.params.id)
            GroupSchema.findByIdAndUpdate(req.params.id, { $set: { "Delete": 1 } }).then((response) => {
                res.send(response)
            })

        }
        else {

            UserSchema.find({ GroupId: req.params.id }).select('id').then((response) => {
                if (response) {
                    UserSchema.updateMany({ _id: { $in: response } },
                        { $set: { GroupId: 0 } }).then((res) => {
                            console.log(res)
                        })
                }

            })
            GroupSchema.findByIdAndUpdate(req.params.id, { $set: { "Delete": 1 } }).then((reponse) => { res.send(response) })

        }
    })

}
exports.FindUsersOfACommittee = (req, res) => {

    UserSchema.find({ $and: [{ CommitteeId: req.params.id }, { Delete: 0 }] }, (error, data) => {
        if (error) {
            res.send(error)
        }
        else {
            for (const element of data) {
                console.log(element);
            }
        }
    })
}
exports.updateGroupDetails = async (req, res) => {

    try {
        let Validation = Schema.validate(req.body)
        if (!Validation.error) {

            await GroupSchema.findByIdAndUpdate(req.params.id, { $set: req.body }, (error, data) => {
                if (error) {
                    res.send("error")
                }
                else {
                    res.send(data)

                }
            })

        }
        else {
            res.send(Validation.error)
        }
    }
    catch (error) {

    }
}

exports.GroupDelete = async (req, res) => {

    try {

        if (req.body) {

            await GroupSchema.findByIdAndDelete(req.params.id, (error, data) => {
                if (error) {
                    res.send("error")
                }
                else {
                    res.send(data)

                }
            })

        }
        else {
            res.send("error")
        }
    }
    catch (error) {

    }
}