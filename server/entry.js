var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();
const route = require('./route/routes');

mongoose.connect('mongodb://localhost:27017/meanAuth');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected at port 27017');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

const PORT = 3000;

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(cors());

app.use('/api', route);

app.get('/', (req, res) => {
    res.send('app.get(/)')
});

app.listen(PORT, () => {
    console.log('Server has been started at port: ' + PORT);
});