require('dotenv').config({ path: __dirname + '/.env' })

const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

mongoose.connect(process.env.DB_ip, {
  authSource: process.env.DB_authSource,
  user: process.env.DB_user,
  pass: process.env.DB_pass,
  dbName: process.env.DB_name
});

app.use(express.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use('/static', express.static('static'));

app.use(cookieParser());
app.use(express.json());


const mainRouter = require('./app/router/mainRouter');
const authRouter = require('./app/router/authRouter');

const authMiddleware = require("./app/middlewares/auth")

app.use('/', mainRouter);
app.use('/auth', authRouter);


app.listen(process.env.PORT, function () {
  console.log("Node.js server is active " + process.env.PORT);
});