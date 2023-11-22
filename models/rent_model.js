const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
    rentnumber: { type: Number},
    username: { type: String},
    platenumber: { type: String},
    initialdate: { type: Date},
    finaldate: { type: Date},
    status: { type: String},
}, { timestamps: true });

// Antes de guardar, obtener el último rentnumber y asignar el siguiente
rentSchema.pre('save', async function (next) {
    try {
        const lastRent = await Rent.findOne().sort({ rentnumber: -1 });
        this.rentnumber = lastRent ? lastRent.rentnumber + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

const Rent = mongoose.model("Rent", rentSchema);
module.exports = Rent;