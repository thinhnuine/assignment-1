const jwt = require('jsonwebtoken')
const userModel = require('../models/User.js')

const generateAccessToken = (id) => {
    try {
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, { // id+secretKey => 1102abc
            expiresIn: "30m",
        });
        return token;
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            status: "Bạn chưa đăng nhập"
        })
    }
};

const generateRefreshToken = (id) => {
    try {
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, { // id+secretKey => 1102abc
            expiresIn: "1y",
        });
        return token;
    } catch (error) {
        return res.status(400).json({
            error: error.message,
            status: "Bạn chưa đăng nhập"
        })
    }
};

const authentication = async (req, res, next) => {

    try {
        const beazerToken = req.headers.authorization;

        const token = beazerToken?.split(" ")[1];
        const checkToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const userId = checkToken.id;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).json("Bạn chưa đăng nhập");
        }

        req.userId = userId;
        req.user = user;
        next()

    } catch (error) {
        console.log(error)
        res.status(400).json(" Phiên đăng nhập bạn đã hết hạn")
    }
};

module.exports = {
    authentication,
    generateAccessToken,
    generateRefreshToken
};