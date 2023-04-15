import mysql from 'mysql2/promise';

const dbConnection = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'estrela-pneus'
});

export default dbConnection;
