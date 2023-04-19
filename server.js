import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: '*', credentials: true })); 


import { onUserAuthentication } from './server/authentication/register/authentication.js'

app.use('/Authentication', onUserAuthentication);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
