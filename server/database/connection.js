import mysql from 'mysql';

const dbConnection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'estrela-pneus'
});

dbConnection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + dbConnection.threadId);
  });
  

export default dbConnection;
