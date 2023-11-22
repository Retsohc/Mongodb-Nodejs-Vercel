const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log('==> Connect MongoDB Atlas');
    } catch (error) {
        console.error('Error connect MongoDB', error);
        process.exit(1); // Salir del proceso con error
    }
};

module.exports = connectDB;