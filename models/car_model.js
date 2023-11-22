const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    platenumber: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    status: { type: String, enum: ['disponible', 'no disponible']},
    dailyvalue: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);	