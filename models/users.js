const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema = new Schema({
    name: String,
    password: String
});

module.exports = mongoose.model('User', Userschema);