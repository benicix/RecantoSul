let cont = 1;

//função responsavel por cadastrar na tabela os registros que vem dos botões
function registrar(nome, valor =534, qtd, tipo='normal') {
    let nomeProduto = nome;
    let valorProduto = valor;
    let qtdProduto = qtd;
    let tamanho;


    if(document.getElementById('medio').checked){
        if(tipo=='normal'){
            valorProduto = 16;
        }else{
            valorProduto = 30;
        }
        tamanho = "M"
    } else if(document.getElementById('grande').checked){
        if(tipo=='normal'){
            valorProduto = 18;
        }else{
            valorProduto = 40;
        }
        tamanho = "G"
    }else if(document.getElementById('pequeno').checked){
        if(tipo=='normal'){
            valorProduto = 12;
        }else{
            valorProduto = 20;
        }
        tamanho = "P"
    }else{
        alert("Defina o Tamanho");
        return;
    }
    
    //criando elementos td da tabela
    let td = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    //criando input hidden para enviar dados pelo formulario e atribuindo seu valor

    let input = document.createElement('input');
    //input = setAttribute('type', 'hidden');
    //input = setAttribute('value', valorProduto);
    //input = setAttribute('name', 'total[]');
    input.value = valorProduto;
    input.type = "hidden";
    input.name = "total";
    input.id = "hidden" + cont;


    let inputNome = document.createElement('input');
    //input = setAttribute('type', 'hidden');
    //input = setAttribute('value', valorProduto);
    //input = setAttribute('name', 'total[]');
    inputNome.value = nomeProduto;
    inputNome.type = "hidden";
    inputNome.name = "nome";
    inputNome.id = "nome" + cont;

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
            .then(resposta => {
                console.log("valor Removido");
            })
            .catch(reject => {
                console.log("Ocorreu um erro");
            });
    };


    let tr = document.createElement('tr');

    td.appendChild(document.createTextNode(nomeProduto + " " +tamanho));
    td2.appendChild(document.createTextNode(qtdProduto));
    td3.appendChild(document.createTextNode(valorProduto));

    td4.appendChild(buttonDelete);




    tr.className = "conteudo";
    tr.id = cont;
    tr.setAttribute('name', 'valores[]');
    tr.setAttribute('value', 'teste');
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    let formHidden = document.getElementById("formulario");

    let lineTable = document.getElementById("bodyTable");
    lineTable.appendChild(tr);
    formHidden.appendChild(input);
    formHidden.appendChild(inputNome);
    adicionarValor(valor);
    cont++;
}

function apagarRegistro(cont) {

    document.getElementById(cont).remove();
    document.getElementById("hidden" + cont).remove();
    document.getElementById("nome" + cont).remove();

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
    return new Promise((resolve, reject) => {
        let valorAtual = document.getElementById('valorTotal').value;
        //console.log(document.getElementById('valorTotal').value);
        valorAtual = parseInt(valorAtual) - valor;
        if (valorAtual <= 0) {
            alert("Venda Concluída \n troco= " + valorAtual * -1);

            valorAtual = 0;
        } else {
            valorAtual = valorAtual.toString();
        }





        document.getElementById('valorTotal').value = valorAtual;;
        resolve();

    });
}
function FinalizarCompra(tipo = 'local') {
    if (tipo === 'local') {
        if (document.getElementById('valorTotal').value > 0) {
            if (document.getElementById('cpf').value != '') {
                if (validaCpfCnpj(document.getElementById('cpf').value)) {
                    let inputCpf = document.createElement('input');

                    inputCpf.value = document.getElementById('cpf').value;
                    inputCpf.type = "hidden";
                    inputCpf.name = "inputCpf";
                    inputCpf.id = "cpf" + cont;
                    let formHidden = document.getElementById("formulario");
                    formHidden.appendChild(inputCpf);

                    document.formulario.submit();
                } else {
                    document.getElementById('cpf').style.border = "solid red 1px";
                    alert("CPF/CNPJ inválido");
                }
            } else {
                document.formulario.submit();
            }

            console.log("entrou aqui");
            //document.formulario.submit();
        }
    } else {
        if (document.getElementById('valorTotal').value > 0) {
            if (document.getElementById('cpf').value != '') {
                if (validaCpfCnpj(document.getElementById('cpf').value)) {
                    let inputCpf = document.createElement('input');

                    inputCpf.value = document.getElementById('cpf').value;
                    inputCpf.type = "hidden";
                    inputCpf.name = "inputCpf";
                    inputCpf.id = "cpf" + cont;
                    let formHidden = document.getElementById("formulario");
                    formHidden.appendChild(inputCpf);


                    let inputViagem = document.createElement('input');

                    inputViagem.value = "Viagem";
                    inputViagem.type = "hidden";
                    inputViagem.name = "inputViagem";
                    inputViagem.id = "nome" + cont;
                    formHidden.appendChild(inputViagem);

                    document.formulario.submit();
                } else {
                    document.getElementById('cpf').style.border = "solid red 1px";
                    alert("CPF/CNPJ inválido");
                }
            } else {
                document.formulario.submit();
            }

        }

    }

}
function validaCpfCnpj(val) {
    //let val = document.getElementById('cpf');
    if (val.length == 11) {
        var cpf = val.trim();

        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.split("");

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cpf.length > i; i++) {

            if (cpf[i - 1] != cpf[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            console.log("teste");
            return false;
        }

        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }

        v1 = ((v1 * 10) % 11);

        if (v1 == 10) {
            v1 = 0;
        }

        if (v1 != cpf[9]) {
            return false;
        }

        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }

        v2 = ((v2 * 10) % 11);

        if (v2 == 10) {
            v2 = 0;
        }

        if (v2 != cpf[10]) {
            return false;
        } else {
            return true;
        }
    } else if (val.length == 14) {
        var cnpj = val.trim();

        cnpj = cnpj.replace(/\./g, '');
        cnpj = cnpj.replace('-', '');
        cnpj = cnpj.replace('/', '');
        cnpj = cnpj.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            return false;
        }

        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            } else {
                v1 += cnpj[i] * p2;
            }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
            v1 = 0;
        } else {
            v1 = (11 - v1);
        }

        if (v1 != cnpj[12]) {
            return false;
        }

        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            } else {
                v2 += cnpj[i] * p2;
            }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
            v2 = 0;
        } else {
            v2 = (11 - v2);
        }

        if (v2 != cnpj[13]) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
function ativarTamanho(tamanho, ids){
    document.getElementById('pequeno').checked = false;
    document.getElementById('medio').checked = false;
    document.getElementById('grande').checked = false;
    document.getElementById('labelPequena').style.border="none";
    document.getElementById('labelPequena').style.backgroundColor="#850000";
    document.getElementById('labelMedia').style.border="none";
    document.getElementById('labelMedia').style.backgroundColor="#850000";
    document.getElementById('labelGrande').style.border="none";
    document.getElementById('labelGrande').style.backgroundColor="#850000";

    document.getElementById(tamanho).checked = true;
    document.getElementById(ids).style.border="solid yellow 1px";
    document.getElementById(ids).style.backgroundColor="#C20101";
    
}


