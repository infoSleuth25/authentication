const mogoose = require('mongoose');

function connectToDB(){
    mogoose.connect(process.env.DB_CONNECT)
    .then(function(){
        console.log("Connection successful");
    })
    .catch(function(err){
        console.log("No Connection");
        console.log(err);
    })
}

module.exports = connectToDB;