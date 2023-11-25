const { validationResult } = require('express-validator');
const Car = require('../models/car_model');

const createCar = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), error: true });
    }

    const { platenumber, brand, status, dailyvalue } = req.body;

    try {
        const existingCar = await Car.findOne({ platenumber });

        if (existingCar) {
            return res.json({ message: 'La placa del auto ya existe, ingresa otro...' });
        }

        const newCar = new Car({ platenumber, brand, status, dailyvalue });
        await newCar.save();
        res.json({ message: 'Auto agregado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar el automóvil en la base de datos' });
    }
};

const getAvailableCars = async (req, res) => {
    try {
        const cars = await Car.find({ status: 'disponible' });
        res.json({ cars });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de automóviles disponibles' });
    }
};

const getUnavailableCars = async (req, res) => {
    try {
        const cars = await Car.find({ status: 'no disponible' });
        res.json({ cars });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de automóviles no disponibles' });
    }
};

const getCarByPlateNumber = async (req, res) => {
    try {
        const car = await Car.findOne({ platenumber: req.params.platenumber });

        if (!car) {
            return res.status(404).json({ error: 'No se encontró el automóvil' });
        }

        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el automóvil' });
    }
};

const updateCar = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), error: true });
    }

    try {
        const updatedCar = await Car.findOneAndUpdate({ platenumber: req.params.platenumber }, {
            brand: req.body.brand,
            dailyvalue: req.body.dailyvalue
        }, { new: true });

        if (!updatedCar) {
            return res.status(404).json({ error: 'No se encontró el automóvil para actualizar' });
        }

        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el automóvil', error: true });
    }
};

const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findOneAndDelete({ platenumber: req.params.platenumber });

        if (!deletedCar) {
            return res.status(404).json({ error: 'No se encontró el automóvil para eliminar' });
        }

        res.json({ message: 'Auto eliminado con éxito' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el automóvil', error: true });
    }
};

module.exports = {createCar, getAvailableCars, getUnavailableCars,getCarByPlateNumber, updateCar, deleteCar};
