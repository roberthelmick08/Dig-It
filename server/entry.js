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

// AWS Config
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_KEY_ID,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dig-it-custom-images',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;

// Mongoose 
mongoose.connect('mongodb://localhost:27017/meanAuth');
// mongoose.connect(process.env.MONGO_URL_PROD);

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