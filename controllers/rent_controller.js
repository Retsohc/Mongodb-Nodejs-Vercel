const moment = require('moment');
const Rent = require('../models/rent_model');
const Car = require('../models/car_model');


//Controlador para crear una renta
const createRent = async (req, res) => {
    try {
        const { platenumber, initialdate, finaldate } = req.body;

        // Validar el formato dd/mm/yyyy usando moment.js
        const dateFormat = 'DD/MM/YYYY';
        if (!moment(initialdate, dateFormat, true).isValid() || !moment(finaldate, dateFormat, true).isValid()) {
            return res.status(400).json({ error: 'Formato de fecha inválido. Utiliza dd/mm/yyyy' });
        }

        // Convertir las fechas al formato deseado (por ejemplo, ISO 8601)
        const isoInitialDate = moment(initialdate, dateFormat).toISOString();
        const isoFinalDate = moment(finaldate, dateFormat).toISOString();

        // Verifica que la fecha inicial no sea menor a la fecha actual
        const currentDate = new Date();
        if (new Date(isoInitialDate) < currentDate) {
            return res.status(400).json({ error: 'La fecha inicial no puede ser menor a la fecha actual' });
        }

        // Verifica que la fecha final sea igual o superior a la fecha inicial
        if (new Date(isoFinalDate) < new Date(isoInitialDate)) {
            return res.status(400).json({ error: 'La fecha final debe ser igual o superior a la fecha inicial' });
        }

        // Verifica el estado del automóvil antes de crear la renta
        const car = await Car.findOne({ platenumber });

        if (!car) {
            return res.status(400).json({ error: 'El automóvil no existe' });
        }

        if (car.status !== 'disponible') {
            return res.status(400).json({ error: 'El automóvil no está disponible para renta' });
        }

        // Actualiza el estado del automóvil a 'no disponible'
        await Car.findOneAndUpdate({ platenumber }, { status: 'no disponible' });

        // Obtiene el username del usuario que ha iniciado sesión
        const username = req.session.username;

        // Crea la nueva renta con el username
        const rent = new Rent({ platenumber, username, initialdate: isoInitialDate, finaldate: isoFinalDate });
        await rent.save();

        res.status(201).json({ mensaje: 'Renta creada exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {createRent};