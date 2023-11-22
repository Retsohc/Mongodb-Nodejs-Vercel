const mongoose = require("mongoose");


const rentSchema = new mongoose.Schema({
    rentnumber: { type: Number, required: true, unique: true, index: true },
    username: { type: String, required: true, trim: true },
    platenumber: { type: String, required: true, trim: true },
    initialdate: { type: Date, required: true, min: Date.now },
    finaldate: { type: Date, required: true, validate: { validator: function (value) { return value >= this.initialdate; }, message: "La fecha final debe ser igual o superior a la fecha inicial" }},
    status: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },
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