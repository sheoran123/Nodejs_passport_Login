const express=require('express')
const mongoose=require('mongoose')
const expressLayouts=require('express-ejs-layouts')
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')


const app=express()

// Passport config
require('./config/passport')(passport)

// DB config
const db=require('./config/keys').MongoURI


// connect to mongo

mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log('MongoDb connected ...'))
.catch(err=>console.log(err))

// EJS

app.use(expressLayouts)

app.set('view engine','ejs')


// Bodyparsers
app.use(express.urlencoded({extended:false}))

// Express Session
app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// connect flash
app.use(flash())

// Global vars
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg=req.flash('error_msg')
    res.locals.error=req.flash('error')
    next()
})


// Routes 
app.use('/',require('./routes/index'))

app.use('/users',require('./routes/users'))



const PORT =process.env.PORT||4000


app.listen(PORT,()=>{
    console.log("server is running on port "+PORT)
})