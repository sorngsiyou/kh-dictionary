const express = require('express')
const userController = require('../controllers/userController')
const userRoute=express.Router()
userRoute.get('/',(req,res)=>{
    res.render('signup')
})
userRoute.post('/',userController.register)
module.exports=userRoute