const bcrypt = require("bcryptjs");
const User = require("../models").User;
const Media = require("../models").Media;
const Profile = require("../models").Profile;
const { S3 } = require("@aws-sdk/client-s3");

exports.update = async (req, res) => {

    const {
        firstName,
        lastName,
        oldPassword,
        newPassword,
        phone,
        description,
        latitude,
        longitude,
        commercial
    } = req.body;

    const user = await User.findOne({ where: { id: req.tokenPayload.userId } });

    if (!user) return res.status(409).json({ "message": "Такой пользователь не существует" });

    const userUpdateData = {};

    if (firstName  && firstName !== user.firstName) {
        userUpdateData.firstName = firstName
    }

    if (lastName && lastName !== user.lastName) {
        userUpdateData.lastName = lastName
    }

    if (newPassword && oldPassword) {

        const validPassword = await bcrypt.compare(oldPassword, user.password);

        if (validPassword) {
            const password = await bcrypt.hash(newPassword, 5);
            userUpdateData.password = password;
        }
    }

    if (Object.keys(userUpdateData).length !== 0 ) {
        await user.update(userUpdateData);
    }

    // Profile -------------------------------------
    const modelProfile = await Profile.findOne({ where: { userId: user.id } });

    if (modelProfile) {
        modelProfile.set({
            phone,
            description,
            latitude,
            longitude,
            commercial,
        })
        await modelProfile.save();
    }else{
        const newModelProfile = Profile.build({
            userId: user.id,
            phone,
            description,
            latitude,
            longitude,
            commercial,
        });
        await newModelProfile.save();
    }

    return res.status(200).json({"message":"update"});
};


exports.avatar = async (req, res) => {

    if (!req.file) {
        return res.status(400).json({"message":"Файл пуст"});
    }

    const media = await Media.create({
        "model": 'User',
        "modelId": req.tokenPayload.userId,
        "type": req.file.mimetype,
        "size": req.file.size,
        "fieldname": req.file.fieldname,
        "path": req.file.key
    });

    return res.status(200).json({"message":"Файл сохранен"});
};


exports.deleteAvatar = async (req, res) => {


    const avatar = await Media.findOne({
        where: {
            model: 'User',
            modelId: req.tokenPayload.userId,
            fieldname: 'avatar'
        }
    });

    if (!avatar) return res.status(409).json({ "message": "Файл не существует" });

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

    try{

        await s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: avatar.path });

        await avatar.destroy();

    }catch (error) {

        res.status(400).json({ "message": error.message });

    }

    res.status(200).json({ "message": "Файл успешно удалён" });
};


exports.profile = async (req, res) => {

    const user = await User.findOne({
        where: { id: req.tokenPayload.userId },
        attributes: ['id', 'firstName', 'lastName', 'email'],
        include: 'Profile'
    });

    if (!user) return res.status(404).json({"message":"Такого пользователя не существует"});

    const avatar = await Media.findOne({
        where: {
            model: 'User',
            modelId: user.id,
            fieldname: 'avatar'
        }
    });

    let pathToAvatar = '';
    if (avatar) pathToAvatar = `https://instagram.lern.dev/storage/${avatar.path}`;

    return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: pathToAvatar,
        phone: user.Profile.phone,
        description: user.Profile.description,
        latitude: user.Profile.latitude,
        longitude: user.Profile.longitude,
        commercial: user.Profile.commercial
    });
};
