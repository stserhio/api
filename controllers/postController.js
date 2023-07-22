const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');

const mailConfirmTemplate = require("../templates/mailConfirmTemplate");
const sendMail = require("../services/mailer");
const User = require("../models").User;
const BlackList = require("../models").BlackList;
const Media = require("../models").Media;
const Profile = require("../models").Profile;
const Post = require("../models").Post;
const {S3} = require("@aws-sdk/client-s3");

exports.postCreate = async (req, res) => {


    if (req.files.length === 0) {
        return res.status(400).json({"message": "Файлы отсутствуют"});
    }

    const post = await Post.create({
        description: req.body.description,
        userId: req.tokenPayload.userId
    });

    req.files.forEach(async file => {
        await Media.create({
            "model": 'Post',
            "modelId": post.id,
            "type": file.mimetype,
            "size": file.size,
            "fieldname": file.fieldname,
            "path": file.key
        });
    });


    // console.log(req.files);
    // console.log("------------------------------------------");
    // console.log(req.body.description);

    return res.status(200).json({"message": "Успех"});
};

exports.postDelete = async (req, res) => {

    const post = await Post.findOne({
        where: {
            id: req.params.postId
        },
        include: 'User'
    })

    if (!post) {
        return res.status(404).json({message: "такого поста не существует"})
    }

    if (post.User.id !== req.tokenPayload.userId) {
        return res.status(403).json({message: "нет доступа к удалению поста"})
    }

    const media = await Media.findAll({
        where: {
            model: 'Post',
            modelId: post.id,
        }
    })


    if(media){

        const s3 = new S3({
            endpoint: process.env.AWS_HOST,
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
            sslEnabled: false,
            forcePathStyle: true,
        });
        media.forEach( async (modelMedia) => {
            try{

                await s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: modelMedia.path });

                await modelMedia.destroy();

            }catch (error) {

                res.status(400).json({ "message": error.message });

            }
        })
    }

    post.destroy()
    return res.status(200).json({message: "Success"})
}

