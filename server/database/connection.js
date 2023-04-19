import mysql from 'mysql2/promise';

import dotenv from 'dotenv'
dotenv.config();

const dbConnection = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: '',
  database: process.env.DATABASE
});

export default dbConnection;
