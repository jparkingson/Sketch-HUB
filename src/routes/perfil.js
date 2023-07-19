const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const loginController = require('../controllers/perfilController');

router.get('/', loginController.mostrarPerfilCreador);
router.post('/validar', loginController.registro);
router.post('/login', loginController.login);

module.exports = router;