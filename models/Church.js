const mongoose = require('mongoose');

const churchSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    denominationId: mongoose.Types.ObjectId,
    name: String,
    registrationNumber: String,
    address: String,
    country: String,
    city: String,
    pincode: { type: Number, minlength: 6, maxlength: 6 },
    created: { type: Date, default: Date.now() },
    updated: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Church', churchSchema);