var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
//var cors = require('cors');

var app = express();
//app.use(cors());

var indexRouter = require('./routes/index');
var fighterRouter = require('./routes/fighter');
var categoryRouter = require('./routes/category');


var connectionString = "mongodb+srv://JordanLPDIM:Dawersx62@angularufcdb.0tjvej2.mongodb.net/ufc";

var mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/fighters', fighterRouter);
app.use('/categories', categoryRouter);

module.exports = app;
