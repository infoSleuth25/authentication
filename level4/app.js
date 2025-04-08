const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');
const cookieParser = require('cookie-parser');

const connectToDB = require('./db/conn');
connectToDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user', userRoutes);

module.exports = app;