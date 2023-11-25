const mongoose = require("mongoose");

const returncarSchema = new mongoose.Schema({
    returnnumber: { type: Number, required: true, unique: true, index: true },
    rentnumber: { type: String, required: true },
    returndate: { type: Date, required: true },
}, { timestamps: true });

// Antes de guardar, obtener el último returnnumber y asignar el siguiente
returncarSchema.pre('save', async function (next) {
    try {
        const lastreturncar = await Returncar.findOne().sort({ returnnumber: -1 });
        this.returnnumber = lastreturncar ? lastreturncar.returnnumber + 1 : 1;
        next();
    } catch (error) {
        next(error);
    }
});

const Returncar = mongoose.model("Returncar", returncarSchema);
module.exports = Returncar;