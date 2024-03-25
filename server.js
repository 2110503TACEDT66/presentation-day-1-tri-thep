const express = require('express');
const mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const {xss}=require('express-xss-sanitizer');
const rateLimit=require('express-rate-limit');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config({path:'./config/config.env'});

connectDB();

const companies = require('./routes/companies');
const interviews = require('./routes/interviews');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter=rateLimit({
    windowsMs:10*60*1000,//10 mins
    max: 1000
    });
app.use(limiter);
app.use(cookieParser());

app.use('/api/v1/companies', companies)
app.use('/api/v1/interviews', interviews)
app.use('/api/v1/auth',auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('server running in ', process.env.NODE_ENV, "on " + process.env.HOST + ":" + PORT));

process.on('unhandledRejection', (err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>process.exit(1));
})