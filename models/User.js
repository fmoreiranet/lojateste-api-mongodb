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
    roles: {
        type: Number,
        default: 1,//client = 1 or admin = 0
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = User;