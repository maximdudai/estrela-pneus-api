import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();

import dbConnection from './server/database/connection.js';

import { onUserAuthentication } from './server/authentication/register/authentication.js'

app.use(cors());
app.use(express.json());
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Authentication', onUserAuthentication);

dbConnection.on('acquire', function(connection) {
  console.log('Connection %d acquired', connection.threadId);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})