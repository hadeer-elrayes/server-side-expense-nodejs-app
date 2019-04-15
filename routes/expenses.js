const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user');
const passport = require('passport')
const authenticationMiddleware = require('../middlewares/authentication');
const Expense = require('../models/expense');

router.post('/addExpense', async(req,res,next)=>{
    const{amount , descryption , created}= req.body
    const newExpense = new Expense({
        amount,
        descryption,
        created,
        owner: req.user
    })
    try{
        const saved =await newExpense.save();
         res.send({
            success:true,
            expense:saved
        })
    }catch(e){
        next(e);
    }

})

router.get('/allExpenses',async(req,res,next)=>{
    try{
   const expenses = await Expense.find();
   res.send(expenses)
    }catch(e){
        next(e)
    }
})

router.get('/allExpensesOfUser',async(req,res,next)=>{
    try{
   const {user} = req;
   const now =  new Date();

   const month = parseInt(req.param.month)
   now.setMonth(month);

   const firstDate = new Date(now.getFullYear(),now.getMonth(),1);
   const lastDate = new Date(now.getFullYear(),now.getMonth()+1,0);
   const query  = {owner  :user._id , created :{
       $gte : firstDate,
       $ls : lastDate
   }}   
   const expense = await Expense.find(query);
   res.send({expense})
    }catch(e){
        next(e)
    }
})

router.delete('/deleteExpense/:e_id',async (req,res,next)=>
{
    const e_id = req.params.e_id;
    try{
        await Expense.deleteOne({_id:e_id});
        res.send({
            success : true
        })
    }catch(e){
        next(e)
    }
})

router.put('/updateExpense/:e_id',async (req,res,next)=>{
    const e_id = req.params.e_id ; 
    const {amount , descryption , created }=req.body;
    try{
    const expense = await Expense.update(
        { _id : e_id},
        {amount , descryption , created }
        )
        return res.send({
            success : true,
            expense
        })
    }catch(e){
        next(e)
    }
})
module.exports = router;

