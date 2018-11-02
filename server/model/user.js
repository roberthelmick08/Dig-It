var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const fs = require('fs');

var privateKEY = 'MY_SECRET_KEY';
// var privateKEY = fs.readFileSync('../../private.key', 'utf8');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastFrostDate: { type: Date, required: true },
    firstFrostDate: { type: Date, required: true },
    hash: { type: String, required: false },
    salt: { type: String, required: false },
    admin: { type: Boolean, required: true },
    phone: { type: String },
    zone: { type: Number, required: true },
    zip: { type: Number, required: true },
    garden: { type: Array },
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, privateKEY);
};

mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);