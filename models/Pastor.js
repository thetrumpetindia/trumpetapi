const mongoose = require('mongoose');

const pastorSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    nationality: String,
    languagesKnown: String,
    birthPlace: String,
    dob: Date,
})

module.exports = mongoose.model('Pastor', pastorSchema);