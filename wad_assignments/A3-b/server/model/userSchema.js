const mongoose= require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Profession: {
        type:String,
        required:true
    },
    Email: {
        type:String,
        required:true
    },
    
    Password: {
        type:String,
        required:true
    },
    Conpwd: {
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    if(this.isModified('Password')){
        this.Password= await bcrypt.hash(this.Password,12);
        this.Conpwd= await bcrypt.hash(this.Conpwd, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign( {_id : this._id}, process.env.JWT_SECRET);
        this.tokens =this.tokens.concat({token:token});
        //the tokens defined in userschema
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('Wad',userSchema, 'PRACTICE');
module.exports=User;