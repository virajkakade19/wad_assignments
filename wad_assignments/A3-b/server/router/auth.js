// const express = require('express');
// const router = express.Router();
// const User=require('../model/userSchema');
// router.get('/', (req, res)=>{
//     res.send('auth.js!');
// });
//Promises
// router.post('/register', (req,res)=>{
//     const {name,Email,phone,Password,conpwd}=req.body;
//     if(!name || !Email || !phone|| !Password || !conpwd){
//         return res.status(422).json({msg:'Please enter all fields'});
//     }

//     User.findOne({Email:Email})
//     .then((user) =>{ 
//         if(user)return res.status(400).json({msg:"USer Exists"})
//     });

//     const user = new User({name,Email,phone,Password,conpwd});
//     user.save().then(()=>{
//         res.status(201).json({message:"registration successful!"});
//     })
        
//     // console.log(req.body);
//     // res.json({message:req.body}); //postman
//     // res.send("succeess");

// })

// module.exports=router;

const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const User=require('../model/userSchema');
const authenticate=require('../middleware/authenticate');
router.get('/', (req, res)=>{
    res.send('auth.js!');
});

router.post('/signup', async (req,res)=>{
    const {Name,Profession,Email,Password,Conpwd}=req.body;
    if(!Name ||  !Profession || !Email  || !Password || !Conpwd){
        return res.status(422).json({msg:'Please enter all fields'});
    }

    try{
       const response = await User.findOne({Email:Email})
            if(response){
                return res.status(422).json({error:"User Exists"});
            }    
            else if(Password!=Conpwd){
                return res.status(422).json({error:"Passwords Don't Match"});
            }  
            else{   
                const user = new User({Name,Profession,Email,Password,Conpwd});
                const newuser = await user.save();
                if(newuser){
                    res.status(201).json({message:"registration successful!"});
                }
            }
        }
        catch(err){
            res.status(500).json({error: err.toString()});
        }
});

router.post('/login', async (req,res)=>{
    try{
        const {Email,Password}=req.body;
        if(!Email  || !Password){
            return res.status(422).json({msg:'Please enter all fields'});
        }

       const respemail = await User.findOne({Email:Email}); //Email existing===Email enetered returns whole rec
        if(respemail){
            const isMatch = await bcrypt.compare(Password, respemail.Password);
            const token =  await respemail.generateAuthToken();
            console.log(token);
            res.cookie("jwt", token, {
                httpOnly:true,
               // expires:new Date(Date.now() + 9000000)                
            });
            
           
            if(!isMatch){
                    return res.status(400).json({error:"Incorrect Credentials"});
            }
            else{
                    res.json({message:"Login Successful"});
            }
        }
        else{
            return res.status(400).json({error:"Incorrect Credentials"});
        }
    }
    catch(err){
        res.status(500).json({error: err.toString()});
    }
});

router.get('/profile',authenticate, (req,res)=>{
    console.log(`profile`);
    res.send(req.rootUser);
})
router.get('/ws',authenticate, (req,res)=>{
    console.log(`ws`);
    res.send(req.rootUser);
})

module.exports=router;