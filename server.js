const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoSanitize= require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss} = require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');


dotenv.config({path:'./config/config.env'});

connectDB();

const company = require('./routes/company')
const auth = require('./routes/auth');
const interviewsession=require('./routes/interviewsession');
const app=express();

const limiter=rateLimit({windowsMs:10*60*1000,max:100});

app.use(express.json());
app.use(limiter);
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use('/api/v1/company',company);
app.use('/api/v1/auth',auth);
app.use('/api/v1/interviewsession',interviewsession);
 
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT , console.log('Server running in ',process.env.NODE_ENV, ' mode on port ' , PORT))

process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.massage}`);
    server.close(()=>process.exit(1))
});