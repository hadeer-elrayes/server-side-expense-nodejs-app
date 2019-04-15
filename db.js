const mongoose = require('mongoose');
const {MONGO_URL} = require('./cofig/env')
mongoose.connect('mongodb://localhost:27017/iti'  ),
{
    useCreateIndex : true ,
    useNewUrlParser : true
}, (err)=>
{
    if (err) 
    { console.error(err) 
    process.exit(1);
}else
{
    console.log("connected successfuly")
}
}
module.exports = mongoose;