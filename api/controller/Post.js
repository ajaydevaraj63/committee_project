const exp = require("express");
const Post = require("../models/Post");
const User = require("../models/UserTable");
const app = exp();
const bdyp = require('body-parser')
const bodyParser = require('body-parser')
app.use(bdyp.json())
app.use(bodyParser.urlencoded({extended: false}))
const mongoose = require('mongoose')


exports.post = (req, res) => {

    Post.findById(req.params.id, (error, data) => { 
        if(!error) { 
            res.send(data)

        }
        else { 
            console.log(error);
        }
    })

}

exports.allposts = (req, res) => { 

    Post.aggregate([
        {
        $lookup: {
            from: "userstables", localField:"UserId", foreignField: "_id", as: "userlist"
        }
    }
    ]).then((result) => {
        res.send(result)
    })
}

exports.deletepost = (req, res ) => {

    Post.findByIdAndUpdate( req.params.id, { Delete: 1 }, (error, data) => { 
        try{
    
            res.send(data)
    
        }
        catch (error) {
            
            console.log(error);
            res.send(error);
    
        }
      })
    
}