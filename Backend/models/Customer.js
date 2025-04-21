const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: false
    },
    room: {
        type: String,
        required: false
    },
    road: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Simple method to compare passwords (without hashing)
customerSchema.methods.comparePassword = function(candidatePassword) {
    return this.password === candidatePassword;
};

module.exports = mongoose.model('Customer', customerSchema); 