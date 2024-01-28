const bcrypt = require('bcrypt');
const userModel= require('../models/UserModel')
const userController={
    register: async(req,res)=>{
        const {
        userName,
        email,
        password,
        }=req.body
        const salt=await bcrypt.genSalt()
        const hashPassword=await bcrypt.hash(password,salt)
        const newUser=new userModel({
            userName,
            email,
            password:hashPassword
        })

        try {
            await newUser.save()
            res.redirect('/');
        } catch (error) {
            
        }
    },

}

module.exports=userController