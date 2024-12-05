const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    resolved: {
        type: Boolean,
        default: false
    },
    subject: String,
    body: String,
    club_name: String,
    upvote: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Request', RequestSchema);