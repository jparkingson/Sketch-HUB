const express = require('express');
const router = express.Router();
const disenadorController = require('../controllers/disenadorController');

router.get('/', disenadorController.mostrarDiseñadores);




module.exports = router;