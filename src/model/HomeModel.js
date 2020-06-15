const conn = require('./connection');

function findDatasUser(){
    console.log("teste");
    var semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    let day= new Date();
    let diaSem = day.getDay();
    diaSem =1;
    return new Promise((resolve, reject) => {
        conn.connect();
        conn.query("SELECT * FROM tb_qtd_pratos where prato like '%"+ semana[diaSem] +"%' OR prato = 'churrasco' OR prato = 'file de frango'", function(err, row,fields){
            if(err) throw err;

            //console.log(row)
            resolve(row);
        });
        
        
    });
}
function findDatas(){
    console.log("teste");
    return new Promise((resolve, reject) => {
        let resposta;
        conn.query("SELECT * FROM tb_perfil", function(err, row,fields){
            if(err) throw err;

            resolve(row[0]);
        });
        
        
        
    });
}

const findUser = findDatasUser()
.then(resolve => {
    console.log(resolve);
    module.exports.findUser = resolve;
});

const findData=findDatas()
.then(resolve => {
    //console.log(resolve.Nome);
    //return resolve.Nome;
    module.exports.findData = resolve.Nome;
});



//module.exports.findUser = findUser;
