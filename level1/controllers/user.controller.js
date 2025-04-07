const {User} = require('../models/user.model');

async function registerUser(req,res){
    const username = req.body?.username;
    const password = req.body?.password;
    if(!username || !password){
        return res.status(400).json({
            msg : "Please provide both username and password"
        });
    }
    const isUserAlreadyRegistered = await User.find({username});
    if(isUserAlreadyRegistered.length != 0){
        return res.status(400).json({
            msg : "User is already registered"
        })
    }
    const user = await User.create({
        username : username,
        password : password
    })
    return res.status(401).json({
        msg : "User is successfully registered",
        user : user
    })
}

async function loginUser(req,res){
    const username = req.body?.username;
    const password = req.body?.password;
    if(!username || !password){
        return res.status(400).json({
            msg : "Please provide both username and password"
        })
    }
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({
            msg : "User is not registered"
        })
    }
    if(password !== user.password){
        return res.status(401).json({
            msg : "Invalid username or password"
        })
    }
    return res.status(200).json({
        msg : "User is successfully logged in",
        user : user
    })
}

module.exports = {registerUser,loginUser};