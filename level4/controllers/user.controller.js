const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const username = req.body?.username;
    const password = req.body?.password;
    if(!username || !password){
        return res.status(400).json({
            msg : "Please provide both username & Password"
        })
    }
    const isUserALreadyExists = await User.findOne({username});
    if(isUserALreadyExists){
        return res.status(400).json({
            msg : "User is already registered"
        })
    }
    try{
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashPassword = await bcrypt.hash(password,saltRounds);
        const user = await User.create({
            username : username,
            password : hashPassword
        })
        return res.status(200).json({
            msg : "User is successfully registered",
            user : user
        })
    }
    catch(err){
        return res.status(400).json({
            msg : "Something went wrong in bcrypt",
            err : err
        })
    }
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
    try{
        const result = await bcrypt.compare(password, user.password);
        if(!result){
            return res.status(401).json({
                msg : "Invalid username or password"
            })
        }
        const payload = {
            id : user._id
        }
        const token = jwt.sign(payload, process.env.SECRET,{ expiresIn: '1h' });
        res.cookie('token',token);
        return res.status(200).json({
            msg : "User is successfully logged in",
            user : user,
            token : token
        })
    }
    catch(err){
        return res.status(400).json({
            msg : "Something went wrong in bcrypt",
            err : err
        })
    }
}

async function getUserProfile(req,res){
    res.status(200).json({
        msg : "User is authorized and can see his profile",
        user : req.user
    })
}

async function logoutUser(req,res){
    res.clearCookie('token');
    return res.status(200).json({
        msg : "User is successfully logged out"
    })
}

module.exports = {registerUser, loginUser,getUserProfile,logoutUser};