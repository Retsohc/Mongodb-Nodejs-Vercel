const express = require('express');
//Controladores
const userController = require('../controllers/user_controller');
const carController = require('../controllers/car_controller');
const rentController = require('../controllers/rent_controller');
const returncarController = require('../controllers/returncar_controller');
//Validaciones
const userValidations = require('../validations/user_validation');
const carValidations = require('../validations/car_validation');
const rentValidations = require('../validations/rent_validation');
const returncarValidations = require('../validations/returncar_validation');

const router = express.Router();


//Ruta GET para ver todas las cuentas registradas
router.get('/api/accounts', userController.getAllAccounts);
//Ruta POST para login
router.post('/api/login', userValidations.loginValidation, userController.login);
//Ruta POST para registrar cuenta
router.post('/api/register', userValidations.registerAccountValidation, userController.registerAccount);
//Ruta POST para cambio de contraseña
router.post('/api/forgotpassword', userValidations.forgotPasswordValidation, userController.forgotPassword);

//Ruta POST para crear un auto
router.post('/api/cars', carValidations.createCarValidation, carController.createCar);
//Ruta GET para ver la lista de autos que solo se encuentran disponibles
router.get('/api/cars', carController.getAvailableCars);
//Ruta GET para buscar un auto en específico
router.get('/api/cars/:platenumber', carController.getCarByPlateNumber);
//Ruta PUT para actualizar un auto
router.put('/api/cars/:platenumber', carValidations.updateCarValidation, carController.updateCar);
//Ruta DELETE para borrar un auto
router.delete('/api/cars/:platenumber', carController.deleteCar);

//Ruta GET para ver la lista de rentas
router.get('/api/rent', rentController.listRent)
//Ruta POST para crear una renta
router.post('/api/rent', rentValidations.createRentValidation, rentController.createRent);

//Ruta GET para ver la lista de devoluciones
router.get('/api/returncar', returncarController.listReturncar)
//Ruta POST para crear una devolución
router.post('/api/returncar', returncarValidations.createReturncarValidation, returncarController.createReturncar);

module.exports = router;