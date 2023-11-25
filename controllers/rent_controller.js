const { validationResult } = require('express-validator');
const moment = require('moment');
const Rent = require('../models/rent_model');
const Car = require('../models/car_model');

const listRent = async (req, res) => {
    try {
        const rentList = await Rent.find();

        //Para saber si hay rentas registrados
        if (rentList.length === 0) {
            return res.status(404).json({ mensaje: 'No hay rentas registradas' });
        }

        res.status(200).json({ rentList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const createRent = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), error: true });
    }

    try {
        const { platenumber, initialdate, finaldate } = req.body;

        const dateFormat = 'DD/MM/YYYY';
        if (!moment(initialdate, dateFormat, true).isValid() || !moment(finaldate, dateFormat, true).isValid()) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Utiliza dd/mm/yyyy' });
        }

        const isoInitialDate = moment(initialdate, dateFormat).toISOString();
        const isoFinalDate = moment(finaldate, dateFormat).toISOString();

        const currentDate = new Date();
        if (new Date(isoInitialDate) < currentDate) {
            return res.status(400).json({ error: 'La fecha inicial no puede ser menor a la fecha actual' });
        }

        if (new Date(isoFinalDate) < new Date(isoInitialDate)) {
            return res.status(400).json({ error: 'La fecha final debe ser igual o superior a la fecha inicial' });
        }

        const car = await Car.findOne({ platenumber });

        if (!car) {
            return res.status(400).json({ error: 'El automóvil no existe' });
        }

        if (car.status !== 'disponible') {
            return res.status(400).json({ error: 'El automóvil no está disponible para renta' });
        }

        await Car.findOneAndUpdate({ platenumber }, { status: 'no disponible' });

        const username = req.session.username;

        const rent = new Rent({ platenumber, username, initialdate: isoInitialDate, finaldate: isoFinalDate });
        await rent.save();

        res.status(201).json({ mensaje: 'Renta creada exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {createRent, listRent};