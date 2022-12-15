const mongoose = require('mongoose')
const CommentSchema = mongoose.Schema({
    Comment: {
        require: true,
        type: String
    },
    PostId: {
        type: String
        , require: true
    },
    UserId: {
        type: String,
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model("comment", CommentSchema);