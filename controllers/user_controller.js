const User = require('../models/user_model');


//Controlador para obtener todas las cuentas registradas
const getAllAccounts = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        if (users.length > 0) {
            res.json({ users });
        } else {
            res.json({ message: 'No hay cuentas registradas.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

//Controlador para el inicio de sesión
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (user) {
            req.session = user;
            res.json({ message: `Inicio de sesión exitoso como: ${user.role}` });
        } else {
            res.json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error(error);
        res.json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

//Controlador para registrar una cuenta
const registerAccount = async (req, res) => {
    const { username, name, role, password, reservedword } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.json({ message: 'El usuario ya existe, ingresa otro...' });
        }
        const newUser = new User({ username, name, role, password, reservedword });
        await newUser.save();
        res.json({ message: 'Usuario agregado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

//Controlador para cambiar la contraseña
const forgotPassword = async (req, res) => {
    const { username, reservedword, newPassword } = req.body;

    try {
        const user = await User.findOne({ username, reservedword });

        if (user) {
            user.password = newPassword;
            await user.save();
            res.json({ message: 'Contraseña actualizada correctamente' });
        } else {
            res.json({ message: 'Nombre de usuario o palabra reservada incorrectos' });
        }
    } catch (error) {
        console.error(error);
        res.json({ message: 'Hubo un error al procesar la solicitud' });
    }
};

module.exports = {getAllAccounts, login, registerAccount, forgotPassword};