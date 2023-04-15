import bcrypt from 'bcrypt';
import dbConnection from '../../database/connection.js';
import authToken from 'jsonwebtoken';

const onClientRegister = async (res, {email, name, password}) => {
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

        const token = authToken.sign({ password }, 'secret');
        res.status(200).send({ token });

    } catch (err) {
        console.error(err);
        res.status(200).json({ error: 'Something went wrong, please try again later!' });
    }

};

const onClientLogin = async (res, {email, password}) => {
    try {
        
        const [rows] = await dbConnection.query('SELECT * FROM WHERE emailAddress = ? AND userPassword = ?', [email, hashedPassword]);
        if(rows.length > 0) {

            return;
        }

        res.send(200).json({
            loginError: 'Invalid email or password. Please try again.'
        })

    } catch (error) {
        if(error) throw error;
    }
};

export async function onUserAuthentication(req, res) {
    const authType = req.body.authType;

    if(authType === 'register') {
        onClientRegister(res, req.body);
    } else {
        onClientLogin(res, req.body);
    }
}