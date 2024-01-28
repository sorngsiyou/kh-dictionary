const express = require('express')
const router = express.Router()
const dataModel = require('../models/dataModel')

const checkSession = (req, res, next) => {
    
    if (!req.session.user) {
      // If the user is not logged in, redirect to another page
      return res.redirect('/');
    }
    next();
  };

router.get('/',checkSession, async(req,res,next)=>{
    const itemsPerPage = 100;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * itemsPerPage
    try {
        const loginedUser=req.session.user
        const totalItems = await dataModel.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);    
        const allData = await dataModel.find()
            .sort({ createdAt: 'desc' })
          .skip(startIndex)
          .limit(itemsPerPage);
    
        res.locals.allData = allData;
        res.locals.currentPage = page;
        res.locals.totalPages = totalPages;

       /* const allData= await dataModel.find() */
        res.render('home',{allData, loginedUser})
    } catch (error) {
        
    }
    
})
router.post('/',(req,res,next)=>{
    const userId=req.session.user
    const khmerText=req.body.khmerText
    const englishText=req.body.englishText
    const description = req.body.description
    const imageLink = req.body.imageLink
    const datamodel= new dataModel({
        userId,
        khmerText,
        englishText,
        imageLink,
        description
    })
    try {
        datamodel.save()
        req.flash('success', 'ទិន្នន័យត្រូវបានបញ្ចូលដោយជោគជ័យ');
        res.redirect('/home');
    } catch (error) {
        
    }
    
})

router.get('/delete/:id',async(req,res,next)=>{
    const deleteData= await dataModel.findByIdAndDelete({_id:req.params.id})
    if(deleteData){
        req.flash('success', 'ទិន្នន័យត្រូវបានលុបដោយជោគជ័យ');
        res.redirect('/home');
    }
   
})

router.get('/logout',async(req,res,next)=>{
    req.session.destroy((err) => {res.redirect('/');});
   
})


module.exports=router