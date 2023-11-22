const Car = require('../models/car_model');


//Controlador para la creación de un auto
const createCar = async (req, res) => {
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

//Controlador para obtener la lista de autos disponibles
const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ status: 'disponible' });
        res.json({ cars });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de automóviles disponibles' });
    }
};

//Controlador para buscar un auto específico
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

//Controlador para actualizar un auto
const updateCar = async (req, res) => {
    try {
        const updatedCar = await Car.findOneAndUpdate(
            { platenumber: req.params.platenumber },
            {
                brand: req.body.brand,
                dailyvalue: req.body.dailyvalue,
            },
            { new: true }
        );

        if (!updatedCar) {
            return res.status(404).json({ error: 'No se encontró el automóvil para actualizar' });
        }

        res.json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el automóvil', error: true });
    }
};

// Controlador para eliminar un auto
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

module.exports = {createCar, getCars, getCarByPlateNumber, updateCar, deleteCar};