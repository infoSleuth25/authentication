const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.route');

const connectToDB = require('./db/conn');
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoutes);

module.exports = app;