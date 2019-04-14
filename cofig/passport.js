const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


module.exports = (passport) =>{
    let config = {}; 
    config.secretOrKey = 'thisIsSecret' ;
    config.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken ;
    passport.use(new jwtStrategy(config , async (jwtPayload, done)=>{
        try{
          const user = await User.findById(jwtPayload._id);
          if(!user){console.log("not user")}
        if(user) {
          console.log("not user")
        return done(null , user)
        }else { return done(null , false)}
        }catch(e){
          return done(err,false)
        }
    })) 
}

