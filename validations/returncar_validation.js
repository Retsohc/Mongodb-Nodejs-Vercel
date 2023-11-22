const { body } = require('express-validator');

const createReturncarValidation = [
    body('rentnumber').notEmpty().withMessage('El número de renta es obligatorio'),
    body('platenumber').notEmpty().withMessage('La placa del automóvil es obligatoria'),
    body('returndate').notEmpty().withMessage('La fecha de devolución es obligatoria'),
];

module.exports = {createReturncarValidation};