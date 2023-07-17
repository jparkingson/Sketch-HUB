const mysql = require('mysql');
/*
const db = mysql.createConnection({
 host: 'localhost',
 user: 'KevinS',
 password: 'kevin123',
 database: 'Trabajo_En_Clase'
});
*/

const db = mysql.createConnection({
    host: 'localhost',
    user: 'KevinS',
    password: 'kevin123',
    database: 'sketch_hub'
   });
   

db.connect((error) => {
 if (error) {
 throw error;
 }
 console.log('Conexión exitosa a la base de datos.');
});
module.exports = db;

/*La base de datos le puedes colocar el nombre que guste, la tabla se llamará
productos con los siguientes campos*/