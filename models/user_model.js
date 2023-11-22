const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ['administrador', 'usuario'] },
    reservedword: { type: String, required: false, trim: true },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);