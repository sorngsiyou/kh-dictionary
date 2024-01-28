const express = require('express')
const loginController = require('../controllers/loginController')
const loginRoute=express.Router()
loginRoute.get('/',(req,res)=>{
    res.render('signin')
})
loginRoute.post('/',loginController.login)
module.exports=loginRoute