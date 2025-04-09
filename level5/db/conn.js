const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(function(){
        console.log("Connection Successful");
    })
    .catch(function(err){
        console.log("No Connection");
        console.log(err);
    })
}

module.exports = connectToDB;