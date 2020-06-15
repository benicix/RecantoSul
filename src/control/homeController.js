const sql = require("../model/HomeModel");

exports.paginaInicial  = (req, res) => {
    let teste = sql.findUser;
    console.log(sql.findUser);
    res.render('index', {
        nomePerfil: sql.findData,
        Pratos: sql.findUser
    });
} 