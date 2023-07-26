const mongoose = require('mongoose')
const LikeSchema = mongoose.Schema({
    PostId: {
        require: true,
        type: String
    },
    PostLike: {
        type: Number
        , require: true
    },
    UserId: {
        type: String,
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model("like", LikeSchema);