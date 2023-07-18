const User = require("../models").User;

const checkHasUser = async (req, res, next) => {

    const hasUser = await User.findOne({ where: { email: req.body.email } });

    if (hasUser) return res.status(409).json({ "message": "Такой пользователь уже существует" });

    return next();
}

module.exports = checkHasUser;