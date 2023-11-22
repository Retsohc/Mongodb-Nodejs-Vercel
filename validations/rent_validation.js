const { body } = require('express-validator');

const createRentValidation = [
    body('platenumber').notEmpty().withMessage('La placa del automóvil es obligatoria'),
    body('initialdate').notEmpty().withMessage('La fecha inicial es obligatoria'),
    body('finaldate').notEmpty().withMessage('La fecha final es obligatoria'),
];

module.exports = {createRentValidation};
