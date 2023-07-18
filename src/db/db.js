const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sketch_hub'
});
db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('Conexión exitosa a la base de datos.');
});
module.exports = db;

