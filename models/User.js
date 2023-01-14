const mongoose = require("mongoose");

const User = mongoose.model("User", {
    name: String,
    email: {
        type: String,
        unique: true
    },
    pass: String,
    foto: String,
    data_nasc: Date,
    ative: {
        type: Boolean,
        default: true
    }
});

module.exports = User;