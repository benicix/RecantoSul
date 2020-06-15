const conn = require('./connection');
const thermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

//let isConnected = await printer.isPrinterConnected();       



class Registro {
    constructor(body) {
        this.body = body;
    }
    async registrarPedido() {
        try {


            return new Promise((resolve, reject) => {

                this.somaValores().then(resolve => {
                    //console.log(resolve);
                    conn.query("INSERT INTO tb_pedido (ID_Usuarios, ID_Perfil, Preco, Pedido) values (1,1," + resolve + ", 'teste')", function (err, rows, fields) {
                        if (err) throw err;

                        
                    });
                    this.imprimir();

                });

                
        printer.alignCenter();
        printer.println("Note fiscal");
        printer.println("Endereço: Rua Santo Antônio do Aventureiro ");
                //console.log("chegou aqui");
            });
            
        } catch (e) {
            console.log(e);
        }
    }
    somaValores() {
        return new Promise((resolve, reject) => {
            let valorTotal = 0;
            if (Array.isArray(this.body.total)) {

                for (let index = 0; index < this.body.total.length; index++) {

                    let element = parseFloat(this.body.total[index]);

                    if (typeof this.body.inputViagem != 'undefined' && (element == 12 || element == 16 || element == 18)) {

                        element += 1
                    } else if (typeof this.body.inputViagem != 'undefined' && (element == 20 || element == 30 || element == 40)) {
                        element += 3;
                    }

                    valorTotal += parseFloat(element);

                }

            } else {
                valorTotal = parseFloat(this.body.total);
                if (typeof this.body.inputViagem !== 'undefined' && (valorTotal == 12 || valorTotal == 16 || valorTotal == 18)) {
                    valorTotal += 1
                } else if (typeof this.body.inputViagem !== 'undefined' && (valorTotal == 20 || valorTotal == 30 || valorTotal == 40)) {
                    valorTotal += 3;
                }
                valorTotal = parseFloat(valorTotal);
            }

            resolve(valorTotal);
        })

    }
    imprimir() {

        let printer = new thermalPrinter({
            type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
            interface: '/dev/usb/lp0',                    // Printer interface
            characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA

        });
        printer.alignCenter();
        printer.println("Nota fiscal");
        printer.println("Endereço: Rua Santo Antônio do Aventureiro ");
        printer.println("CNPJ: 37.121.737/0001-72");
        printer.drawLine();
        printer.println("CUPOM FISCAL");
        printer.drawLine();
        printer.leftRight("ITEM  DESCRIÇÃO", "VALOR")
        let valorTotal = 0;
        if (Array.isArray(this.body.total)) {

            for (let index = 0; index < this.body.total.length; index++) {

                let element = parseFloat(this.body.total[index]);

                if (typeof this.body.inputViagem != 'undefined' && (element == 12 || element == 16 || element == 18)) {

                    element += 1
                } else if (typeof this.body.inputViagem != 'undefined' && (element == 20 || element == 30 || element == 40)) {
                    element += 3;
                }
                printer.leftRight(index+1 +"  "+   this.body.nome[index], element);
                valorTotal += parseFloat(element);

            }
            printer.drawLine();
            printer.leftRight("TOTAL R$: ", valorTotal)
            //printer.println("TOTAL R$: " + valorTotal);

        } else {
            valorTotal = parseFloat(this.body.total);
            if (typeof this.body.inputViagem !== 'undefined' && (valorTotal == 12 || valorTotal == 16 || valorTotal == 18)) {
                valorTotal += 1
            } else if (typeof this.body.inputViagem !== 'undefined' && (valorTotal == 20 || valorTotal == 30 || valorTotal == 40)) {
                valorTotal += 3;
            }
            //printer.drawLine();
            printer.leftRight(1 +"  "+   this.body.nome, valorTotal);
            printer.drawLine();
            valorTotal = parseFloat(valorTotal);
        }
        console.log("chegou aqui");
        if(typeof this.body.inputCpf !== 'undefined'){
            console.log("chegou aqui também");
            printer.leftRight("DOC", this.body.inputCpf);
        }
        //await printer.printImage('./assets/olaii-logo-black.png')
        printer.cut();

        printer.execute(function (err) {
            if (err) {
                console.log("Print failed:", error);
            } else {
                console.log('Print done!')
            }
        });
    }

}
module.exports = Registro;