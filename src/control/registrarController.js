const Registro = require('../model/registrarModel');

exports.index = (req,res) => {
    res.render('index', {
        conteudoPost: req.body
    });
}

exports.registrar = function(req,res ) {
    const registro = new Registro(req.body);
    
    registro.registrarPedido();
    
    return res.redirect('back');
    

    res.send(registro.body)
}