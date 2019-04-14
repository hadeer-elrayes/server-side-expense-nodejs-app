const mongoose = require('../db');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const saltRounds = process.env.SALT_ROUNDS ||  10 ;  
//  const hash = promisify(bcrypt.hash)
const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY || 'secret-key';
const schema = new mongoose.Schema({
    username : {
        type:String,
        index :{unique:true}
    },
    email :{type:String , required:true , index :{unique:true} , validate : validator.isEmail},
    password : {type:String , required:true},
    
},{
    collection :'users',
    toJSON: {
        hidden : ['password','__v'],
        transform : true
    }
});
schema.options.toJSON.transform = (doc , ret , options) =>
{
    if(Array.isArray(options.hidden))
    {
        options.hidden.forEach( field => {
            delete ret[field]
        });
    }
    return ret ;
}

schema.method('verifyPassword', function (password){
    const user  = this ; 
   const verify = bcrypt.compare(password , user.password) ;
   if(verify) {return true }else return false

    
})
schema.method('generateToken', function (compPassword){
    const user  = this ; 
  return sign({_id : user._id}, secretKey);

    
})
schema.static('getUserByToken', async function (token) {
    const decoded = await verify(token, secretKey);
    const user = await User.findById(decoded._id);
    if (!user) throw new Error('user not found');
    return user;
});
const hashPassword = (password)=> bcrypt.hash(password, saltRounds)
schema.pre('save', async function(){
    const user = this;
    if(user.isNew || user.modifiedPaths().includes('password'))
    {
       user.password =  await hashPassword(user.password)
    }

})
const User = mongoose.model('User', schema);
module.exports= User;