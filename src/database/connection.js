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
        throw new Error(err);
    }
    else {
        console.log('Connection was succesfully registered!');
    }
});