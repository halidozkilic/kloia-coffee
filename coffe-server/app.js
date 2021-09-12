const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose =require('mongoose');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cors
app.use(cors());

const indexRouter = require('./routes/index');
const coffeRouter = require('./routes/coffeRouter');


app.use('/', indexRouter);
app.use('/coffee',coffeRouter);


mongoose.connect('mongodb+srv://halid:6EpRyyTJdBBJg98M@cluster0.j0t8k.mongodb.net/kloia-task?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log("Success!.MongoDB connected.")
    })
    .catch((error) => {console.error("MongoDb connection failed: " , error)})


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
/* app.use(express.urlencoded({ extended: false })); */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({status:'failed', message:'wrong url please check your url!'});
});

module.exports = app;