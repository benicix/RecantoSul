const homeController = require('./src/control/homeController');


const express = require('express');
const route = express.Router();


//rotas da paginas inicial
route.get('/', homeController.paginaInicial);



module.exports = route;

