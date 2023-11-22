const mongoose = require("mongoose");

const returncarSchema = new mongoose.Schema({
    returnnumber: { type: Number},
    rentnumber: { type: String},
    returndate: { type: Date},
}, { timestamps: true });

// Antes de guardar, obtener el último returnnumber y asignar el siguiente
returncarSchema.pre('save', async function (next) {
    try {
        const lastRent = await Rent.findOne().sort({ returnnumber: -1 });
        this.returnnumber = lastRent ? lastRent.returnnumber + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

const Returncar = mongoose.model("Returncar", returncarSchema);
module.exports = Returncar;