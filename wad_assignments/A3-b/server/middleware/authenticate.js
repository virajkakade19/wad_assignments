const jwt = require("jsonwebtoken");
const user = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Corrected variable name to match usage below
        if (!token) {
            throw new Error('Token not provided');
        }

        const verifyT = jwt.verify(token, process.env.JWT_SECRET);
        const rootUser = await user.findOne({
            _id: verifyT._id,
            "tokens.token": token,
            //"tokens.isExpired": false
        });

        if (!rootUser) {
            throw new Error('User Not Found');
        }

        req.rootUser = rootUser;
        req.token = token;
        req.userId = rootUser._id;
        next();
    } catch (err) {
        console.error('Authentication Error:', err);
        res.status(401).send("Unauthorized!");
    }
};

module.exports = authenticate;
