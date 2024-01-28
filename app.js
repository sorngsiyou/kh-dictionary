const express = require('express')
const app = express()
const cors=require('cors')
const port = 3000
const homeRoute= require('./Routers/homeRoute')
const authRoute=require('./Routers/authRoute')
const loginRoute=require('./Routers/login')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

require('dotenv').config();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'sdfsdfsdfdsfdsa34235346547656',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.successFlash = req.flash('success');
  res.locals.errorFlash = req.flash('error');
  next();
});
require('./database/connection')
app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/',loginRoute)
app.use('/user',authRoute)
app.use('/home',homeRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})