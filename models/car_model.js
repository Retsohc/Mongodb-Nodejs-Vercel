const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    platenumber: {type: String},
    brand: {type: String},
    status: {type: String},
    dailyvalue: {type: Number}
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);	