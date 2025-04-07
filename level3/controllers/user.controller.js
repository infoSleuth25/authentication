const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function registerUser(req,res){
    const username = req.body?.username;
    const password = req.body?.password;
    if(!username || !password){
        return res.status(400).json({
            msg : "Provide both username and password"
        })
    }
    const isUserAlreadyRegistered = await User.findOne({username});
    if(isUserAlreadyRegistered){
        return res.status(400).json({
            msg : "User is already registered"
        })
    }
    try {
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 5;
        const hash = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username,
            password: hash
        });
        return res.status(201).json({
            msg: "User is successfully registered",
            user
        });
    } catch (err) {
        return res.status(500).json({
            msg: "Something went wrong",
            err
        });
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
        if(result){
            return res.status(200).json({
                msg : "User is successfully logged in",
                user : user
            })
        }
        else{
            return res.status(401).json({
                msg : "Invalid username or password"
            })
        }
    }
    catch(err){
        return res.status(400).json({
            msg : "Something went wrong in the bcrypt",
            err : err
        })
    }
}

module.exports = {registerUser, loginUser};