const homeController = require('./src/control/homeController');
const registraPedido = require('./src/control/registrarController');

const express = require('express');
const route = express.Router();


//rotas da paginas inicial
route.get('/', homeController.paginaInicial);
route.post('/', registraPedido.registrar)


module.exports = route;

