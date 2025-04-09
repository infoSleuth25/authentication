const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function registerUser(req,res){
    const username = req.body?.username;
    const password = req.body?.password;
    if(!username || !password){
        return res.status(400).json({
            msg : "Please provide both username and password"
        })
    }
    const isUserAlreadyExists = await User.findOne({username});
    if(isUserAlreadyExists){
        return res.status(400).json({
            msg : "User is already registered"
        })
    }
    try{
        const saltRounds = parseInt(process.env.SALT_ROUNDS);
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username : username,
            password : hashPassword
        })
        return res.status(201).json({
            msg : "User is successfully registered",
            user : user
        })
    }
    catch(err){
        return res.status(400).json({
            msg : "Something went wrong in the bcrypt",
            err : err
        })
    }
}

async function loginUser(req,res){
    res.send("Borse");
}

module.exports = {registerUser, loginUser};