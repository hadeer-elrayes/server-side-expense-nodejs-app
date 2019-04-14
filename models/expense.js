const mongoose = require('../db');

const schema = new mongoose.Schema({
    amount : {
        type:String,
        required : true
    },
    descryption :{type:String},
    created : {type:Date },
    owner : {type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


const Expense = mongoose.model('Expense', schema);
module.exports= Expense;