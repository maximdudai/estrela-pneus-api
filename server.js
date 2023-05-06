import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session'
import cookieParser from 'cookie-parser'

import env from 'dotenv'
env.config();

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: '*', credentials: true })); 

const sessionOptions = {
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: true,
    httpOnly: true
  }
};
app.use(session(sessionOptions));
app.use(cookieParser());

// --------------------------------------------------------------------------------------- \\
import { onUserAuthentication } from './server/authentication/register/authentication.js'

app.use('/Authentication', onUserAuthentication);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/test', (req, res) => {
    
});