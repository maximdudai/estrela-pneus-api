import bcrypt from 'bcrypt';

import dbConnection from '../../database/connection.js';

export async function onUserAuthentication(req, res) {
    const { email, name, password } = req.body;
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    try {
        const [rows] = await dbConnection.query('SELECT emailAddress from user_accounts WHERE emailAddress = ?', [email]);
        if (rows.length > 0) {
          res.status(400).json({ error: 'This email already registered!' });
          return;
        }
        
        const insertQuery = `INSERT INTO user_accounts (fullName, userPassword, emailAddress) VALUES (?, ?, ?)`;
        const values = [name, hashedPassword, email];
        await dbConnection.query(insertQuery, values);
        
        res.json({ message: 'Registration successful.' });
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Something went wrong, please try again later!' });
      }
      
}