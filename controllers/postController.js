const {Media, User} = require("../models");
const {v4: uuidv4} = require("uuid");
const jwt = require("jsonwebtoken");
const Post = require('../models').Post


exports.postCreate = async (req, res) => {

    if (req.files.length === 0) {
        return res.status(400).json({"message": "Файлы пуст"});
    }

    const post = await Post.create({

        description: req.body.description,
        userId: req.tokenPayload.userId
    })




    req.files.forEach(async file => {

        await Media.create({
            "model": 'Post',
            "modelId": 'post.id',
            "type": file.mimetype,
            "size": file.size,
            "fieldname": file.fieldname,
            "path": file.key
        });

    })


    return res.status(200).json({"message": "success"});
    // console.log(req.files)
    // console.log('----------------------')
    // console.log(req.body)

}