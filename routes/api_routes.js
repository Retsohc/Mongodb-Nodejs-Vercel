const express = require('express');
const userController = require('../controllers/user_controller');
const carController = require('../controllers/car_controller');
const rentController = require('../controllers/rent_controller');
const returncarController = require('../controllers/returncar_controller');
const router = express.Router();

//Ruta GET para ver todas las cuentas registradas
router.get('/api/accounts', userController.getAllAccounts);
//Ruta POST para login
router.post('/api/login', userController.login);
//Ruta POST para registrar cuenta
router.post('/api/register', userController.registerAccount);
//Ruta POST para cambio de contraseña
router.post('/api/forgotpassword', userController.forgotPassword);


//Ruta POST para crear un auto
router.post('/api/cars', carController.createCar);
//Ruta GET para ver la lista de autos que solo se encuentran disponibles
router.get('/api/cars', carController.getCars);
//Ruta GET para buscar un auto en específico
router.get('/api/cars/:platenumber', carController.getCarByPlateNumber);
//Ruta PUT para actualizar un auto
router.put('/api/cars/:platenumber', carController.updateCar);
//Ruta DELETE para borrar un auto
router.delete('/api/cars/:platenumber', carController.deleteCar);


//Ruta POST para crear una renta
router.post('/api/rent', rentController.createRent);

//Ruta POST para crear una devolución
router.post('/api/returncar', returncarController.createReturncar);

module.exports = router;