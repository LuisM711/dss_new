const express = require('express');
const router = express.Router();
//const middleware = require('../middlewares/verification.js');




module.exports = () => {
    router.get('/', (req, res) => {
        res.json({ message: 'Bienvenido a la API' });
    });


    return router;
}