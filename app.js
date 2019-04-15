require('./db');
const express = require('express');
//const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');
const cors = require('cors')
//const passport = require('passport');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(passport.initialize());
// app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/expenses',expenseRouter);

// require('./cofig/passport')(passport);



app.use((err,req,res,next) =>
{

    res.status(err.status || 500);
    res.send(err);
})



module.exports = app;
