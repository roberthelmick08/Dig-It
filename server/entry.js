const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const route = require('./route/routes');
require('./config/passport');
require('dotenv').config({ path: './.env' });
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

// Mongoose 
// mongoose.connect('mongodb://localhost:27017/meanAuth');
mongoose.connect(process.env.MONGO_URL_PROD);

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected at port 27017');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

const PORT = 3000;

// Middleware
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', route);

app.get('/', (req, res) => {});

// Catch unauthorised errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

app.listen(PORT, () => {
    console.log('Server has been started at port: ' + PORT);
});

module.exports = app;