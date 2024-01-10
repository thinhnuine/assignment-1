const userModel = require('../models/User.js')

const authorization = async (req, res, next) => {
    try {
        const userId = req.userId;
        const userLogin = req.user;
        if (!(userLogin.role == 'admin')) {
            return res.status(403).json('Ban không có quyền thực hiện chức năng này')
        }
        next();
    } catch (error) {
        return res.json({ error: error})
    }
};

module.exports = {
    authorization
}