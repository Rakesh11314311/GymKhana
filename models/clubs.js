const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    name: String,
    description: String,
    founded_year: Number,
});

module.exports = mongoose.model('Club', ClubSchema);