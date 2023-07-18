const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const { S3 } = require("@aws-sdk/client-s3");

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

const s3Storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
        const fileName = `users/${req.tokenPayload.userId}/${file.fieldname}/` + uuidv4() + path.extname(file.originalname.toLowerCase());
        cb(null, fileName);
    }
});

const sanitizeFile = (file, cb) => {

    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
};

exports.uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
});

// exports.deleteImage = async (req, res, next) => {
//     // await s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: filename }).promise();
//     return next();
// };
