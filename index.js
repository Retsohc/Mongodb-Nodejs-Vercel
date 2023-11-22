const express = require("express");
const cors = require("cors");
const connectDB = require('./database/connection');  
const dotenv = require("dotenv"); 
const routes = require('./routes/api_routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//Usa las rutas definidas en routes.js
app.use('/', routes);

//Conexión a la base de datos 
connectDB();
app.listen(port, () => {
    console.log(`Start server http://localhost:${port}`);
});