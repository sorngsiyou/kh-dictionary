const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel= require('../models/UserModel')
const loginUser = {
  login: async (req, res) => {
    const { email,password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "ទិន្នន័យរបស់អ្នកគឺមិនត្រឹមត្រូវទេ");
      res.redirect("/");
    }
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch){
      req.flash("error", "ទិន្នន័យរបស់អ្នកគឺមិនត្រឹមត្រូវទេ");
      res.redirect("/");
    }else{
      try {
          req.session.user = user.userName
          req.session._id = user._id
          res.redirect("/home");
      } catch (error) {
        
      }
      
      
    }
  },
};

module.exports=loginUser