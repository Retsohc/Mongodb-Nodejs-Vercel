const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type: String},
    name: {type: String},
    password: {type: String},
    role: {type: String},
    reservedword: {type: String},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);