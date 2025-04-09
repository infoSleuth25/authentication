const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');

const session = require('express-session');
const passport = require('passport');

const connectToDB = require('./db/conn');
connectToDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRoutes);

module.exports = app;