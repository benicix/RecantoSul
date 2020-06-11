let cont = 1;

//função responsavel por cadastrar na tabela os registros que vem dos botões
function registrar(nome, valor, qtd) {


    let nomeProduto = nome;
    let valorProduto = valor;
    let qtdProduto = qtd;
    //criando elementos td da tabela
    let td = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    //criando botão delete que vai na tabela, e junto sua propriedades
    let buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = "Excluir";
    buttonDelete.setAttribute('type', 'button');
    buttonDelete.style.border = "none";
    buttonDelete.className = "botaoExcluir " + cont;
    //buttonDelete.onclick=apagarRegistro(cont);
    //adicionando uma função de callback a chamada para que ao clicar ele apague o registro correto.
    buttonDelete.onclick = function () {
        //console.log(this.className);
        let valorClass = this.className
        let valorID = valorClass.split(' ');
        //console.log(valorID[1]);
        apagarRegistro(valorID[1]);
        removerValor(valor)
        .then(resposta=>{
            console.log("valor Removido");
        })
        .catch(reject=>{
            console.log("Ocorreu um erro");
        });
    };


    let tr = document.createElement('tr');

    td.appendChild(document.createTextNode(nomeProduto));
    td3.appendChild(document.createTextNode(qtdProduto));
    td2.appendChild(document.createTextNode(valorProduto));

    td4.appendChild(buttonDelete);




    tr.className = "conteudo";
    tr.id = cont;
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    let lineTable = document.getElementById("bodyTable");
    lineTable.appendChild(tr);
    adicionarValor(valor);
    cont++;
}

function apagarRegistro(cont) {

    document.getElementById(cont).remove();

}
//funções abaixo são responsaveis por adicionar e remover valores do preço total
function adicionarValor(valor) {
    let valorAtual = document.getElementById('valorTotal').value;
    //console.log(document.getElementById('valorTotal').value);
    valorAtual = parseInt(valorAtual) + valor;

    valorAtual = valorAtual.toString();
    document.getElementById('valorTotal').value = valorAtual;;

}

function removerValor(valor) {
    return new Promise((resolve, reject)=>{
        let valorAtual = document.getElementById('valorTotal').value;
        //console.log(document.getElementById('valorTotal').value);
        valorAtual = parseInt(valorAtual) - valor;


        
        valorAtual = valorAtual.toString();

        document.getElementById('valorTotal').value = valorAtual;;
        resolve();

    });
}

