const { body } = require('express-validator');

const createCarValidation = [
    body('platenumber').notEmpty().withMessage('La placa del automóvil es obligatoria'),
    body('brand').notEmpty().withMessage('La marca del automóvil es obligatoria'),
    body('status').notEmpty().isIn(['disponible', 'no disponible']).withMessage('El estado debe ser "disponible" o "no disponible'),
    body('dailyvalue').notEmpty().withMessage('El valor diario del automóvil es obligatorio')
];

const updateCarValidation = [
    body('brand').optional().notEmpty().withMessage('La marca del automóvil es obligatoria'),
    body('dailyvalue').optional().notEmpty().withMessage('El valor diario del automóvil es obligatorio')
];

module.exports = {createCarValidation, updateCarValidation};