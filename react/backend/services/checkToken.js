const userController = require('../controllers/userController');
const checkToken = async (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        const user = await userController.checkToken(token).then(val => {
            if (!val) {
                return false;
            }
            else {
                userController.getUserById(val.id, (user) => {
                    if (user) {
                        req.user = user;
                        req.token = token;
                        next();
                    }
                    else {
                        res.json({ success: false, msg: 'invalid token' });
                    }
                });
            }
        });
    }
    else {
        res.sendStatus(403);
    }
};
exports.checkToken = checkToken;
