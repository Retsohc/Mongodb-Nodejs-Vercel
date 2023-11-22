const { body } = require('express-validator');

const loginValidation = [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

const registerAccountValidation = [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('role').notEmpty().withMessage('El rol es obligatorio'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    body('reservedword').notEmpty().withMessage('La palabra reservada es obligatoria'),
];

const forgotPasswordValidation = [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('reservedword').notEmpty().withMessage('La palabra reservada es obligatoria'),
    body('newPassword').notEmpty().withMessage('La nueva contraseña es obligatoria'),
];

module.exports = {loginValidation, registerAccountValidation, forgotPasswordValidation};