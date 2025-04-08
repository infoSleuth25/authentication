const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authUser(req,res,next){
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({
            msg : "Unauthorized user"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id);
        req.user = user;
        return next();
    }
    catch(err){
        return res.status(400).json({
            msg : "Unauthorized user",
            err : err
        })
    }
}

module.exports = authUser;