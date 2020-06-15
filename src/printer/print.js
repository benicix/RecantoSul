/*const thermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

let printer = new thermalPrinter({
    type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
    interface: '/dev/usb/lp0',                    // Printer interface
    characterSet: 'SLOVENIA',                                 // Printer character set - default: SLOVENIA
    
});
//let isConnected = await printer.isPrinterConnected();       

printer.alignCenter();
printer.println("Hello world");
//await printer.printImage('./assets/olaii-logo-black.png')
printer.cut();

printer.execute(function(err){
    if(err){
        console.log("Print failed:", error);
    }else{
        console.log('Print done!')
    }
});*/