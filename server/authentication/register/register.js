import app from 'express'
import bcrypt from 'bcrypt';

import sendQuery from '../../database/functions/database-functions.js';

export function registerUser(req, res) {
    const { email, name, password } = req.body;
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const query = `INSERT INTO user_accounts (emailAddress, fullName, userPassword) VALUES ('${email}', '${name}', '${hashedPassword}')`;
    const values = [email, name, hashedPassword];
  
    sendQuery(query, values, function(error, results, fields) {
      if (error) {
        console.log('Error registering user:', error);
        res.status(500).send('Error registering user');
      } else {
        console.log('User registered successfully');
        res.send('User registered successfully');
        res.redirect('/');
      }
    });
  }