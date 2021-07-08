const express=require('express')
const router =express.Router()
const {ensureAuthenticated} =require('../config/outh')


// Welcome Page
router.get('/',(req,res)=>res.render('welcome'))

// Dashboard Page
router.get('/dashboard',ensureAuthenticated,(req,res)=>res.render('dashboard',{name:req.user.name}))


module.exports=router

