const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user');
const passport = require('passport')
const authenticationMiddleware = require('../middlewares/authentication');

/* registration */
router.post('/register',  async (req, res, next)=>  {
  try{const user = new User(req.body);
    await user.save();
    res.send(user)
  }
    catch (err){
      next(createError(404,err.message));
    }
  
});
// login
router.post('/authentication',  async (req, res, next)=>  {
  try{
    const {username , password} = req.body;
    if(!email || !password)
    {
      console.log('auth failed');;
    }
    const user = await User.findOne({username});
    if(!user) console.log('NOT FOUND');
  
  const isMatch = await user.verifyPassword(password);
  if(!isMatch) console.log('NOT MATCHED');
  
  const token = await user.generateToken();
  res.send({
    token ,
    user
  })
  }
    catch (err){
       next(createError(400 , err))
    }
  
});

router.use(authenticationMiddleware);

router.get('/profile', (req, res , next) => {
  const{user}=req;
  res.send({user})
  
});

// router.all('*',(req,res,next) => {
//   passport.authenticate('jwt' ,{session :false},(err,user)=>
//   {
//     if(err || !user){
//       const error = new Error("you are not authorized")
//       error.status = 401;
//       throw error;
//     }
//     req.user = user;
//     return next();
//   })(req,res,next);
// });

// router.get('/expense',(req, res,next) => {
//   return res.send({message:'hi , you are authenticated'});
   
//  });
module.exports = router;
