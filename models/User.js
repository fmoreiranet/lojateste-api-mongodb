const mongoose = require('mongoose');

const User = mongoose.model("User", {
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    birth_date: Date,
    photo: String,
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = User;