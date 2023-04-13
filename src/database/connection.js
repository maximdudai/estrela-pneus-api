const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'estrela-pneus'
});
  
connection.connect((err) => {
    if(err)
    {
        console.log(err.stack)
    }
    else {
        console.log('Connection was succesfully registered!');
    }
});