const dotenv =require('dotenv');
const mongoose = require('mongoose');
const express = require ('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());


dotenv.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
const User=require('./model/userSchema');
app.use(require('./router/auth'));

const PORT=process.env.PORT;

// const middleware = (req,res,next) =>{
//     console.log (`mw`);
//     //next();
// };

// app.get('/', (req, res)=>{
//     res.send('Connected to server!');
// });

app.get('/login', (req, res)=>{
    res.send('Login!');
});

// app.get('/home', (req, res)=>{
//     console.log(req.cookies)
//     res.cookie("cookie1",'hey');
//     res.send('About!');
// });

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});