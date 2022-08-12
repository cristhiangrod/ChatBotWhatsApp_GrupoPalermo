const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;
const withSession = () => {

}

/**
 * Esta funcion GENERA EL QRCODE
 */
const withOutSession = () => {
    console.log("No tenemos session guardada");
    
    client = new Client();

    client.on('qr', qr => {
        qrcode.generate(qr, {small: true });
    });
client.on('authenticated', (session) => {
    //Guardamos credenciales de la session para usar luego
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session),(err) => {
        if(err){
            console.log(err);
        }
    });
});

client.initialize();

}

(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();

/* client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small:true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize(); */