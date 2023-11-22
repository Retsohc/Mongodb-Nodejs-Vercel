const { validationResult } = require('express-validator');
const Returncar = require('../models/returncar_model');
const Rent = require('../models/rent_model');
const Car = require('../models/car_model');

const createReturncar = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), error: true });
    }

    try {
        const { rentnumber, platenumber, returndate } = req.body;

        if (!rentnumber || !platenumber || !returndate) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const rent = await Rent.findOne({ rentnumber });

        if (!rent) {
            return res.status(400).json({ error: 'La renta no existe' });
        }

        if (new Date(returndate) < rent.initialdate) {
            return res.status(400).json({ error: 'La fecha de devolución no puede ser menor a la fecha inicial de la renta' });
        }

        const car = await Car.findOne({ platenumber });

        if (!car) {
            return res.status(400).json({ error: 'El automóvil no existe' });
        }

        if (car.status !== 'no disponible') {
            return res.status(400).json({ error: 'El automóvil no está registrado como rentado' });
        }

        await Car.findOneAndUpdate({ platenumber }, { status: 'disponible' });

        const returncar = new Returncar(req.body);
        await returncar.save();

        res.status(201).json({ mensaje: 'Devolución creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    createReturncar
};