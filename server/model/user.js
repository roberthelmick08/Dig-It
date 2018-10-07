var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    zone: { type: Number, required: true },
    zip: { type: Number, required: true },
    garden: { type: Array, required: true },
});

module.exports = mongoose.model('User', userSchema);