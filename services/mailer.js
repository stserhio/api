const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASSWORD,
    },
});

const send = (options) => {
    return transporter.sendMail(options)
};

module.exports = send;