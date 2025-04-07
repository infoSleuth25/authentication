const User = require('../models/user.model');

function caesarEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let code = text.charCodeAt(i);

        if (char >= 'a' && char <= 'z') {
            result += String.fromCharCode(((code - 97 + key) % 26) + 97);
        } else if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode(((code - 65 + key) % 26) + 65);
        } else {
            result += char;
        }
    }
    return result;
}

function caesarDecrypt(text, key) {
    return caesarEncrypt(text, (26 - (key % 26)));
}



async function registerUser(req,res){
    const username = req.body?.username;
    const password = req.body?.password;
    if(!username || !password){
        return res.status(400).json({
            msg : "Please provide both username and password"
        })
    }
    const isUserAlreadyRegistered = await User.findOne({username});
    if(isUserAlreadyRegistered){
        return res.status(400).json({
            msg : "User is already registered"
        })
    }
    const encryptedPassword = caesarEncrypt(password,parseInt(process.env.KEY));
    const user = await User.create({
        username : username,
        password : encryptedPassword
    })
    return res.status(201).json({
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
    const decryptedPassword = caesarDecrypt(user.password , parseInt(process.env.KEY));
    if(decryptedPassword !== password){
        return res.status(401).json({
            msg : "Invalid username or password"
        })
    }
    return res.status(200).json({
        msg : "User is successfully logged In",
        user : user
    })
}

module.exports = {registerUser,loginUser};
