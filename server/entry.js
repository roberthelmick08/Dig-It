var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var app = express();
const route = require('./route/routes');
require('./config/passport');
require('dotenv').config({ path: './../.env' })

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