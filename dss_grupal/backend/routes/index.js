const express = require('express');
const router = express.Router();
//const middleware = require('../middlewares/verification.js');
const generalController = require('../controllers/generalController.js');




module.exports = () => {
    router.get('/', (req, res) => {
        res.json({ message: 'Bienvenido a la API' });
    });
    router.post('/test', generalController.test);


    return router;
}