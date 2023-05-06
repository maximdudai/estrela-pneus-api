import bcrypt from 'bcrypt';
import dbConnection from '../../database/connection.js';
import authToken from 'jsonwebtoken';
import session from 'express-session';


import dotenv from 'dotenv'
dotenv.config();

const error_message = {
    TYPE_DATA: 'Incorrect email address or password.',
    TYPE_SERVER: 'Internat server error, please try again later!'
}
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {id} client_id 
 * @param {username} client_username 
 */

const onClientFinishAuthentication = (req, res, id, username) => {
    try {
        const token = authToken.sign({ 
            id: id, 
            username: username 
        }, process.env.SECRET_KEY);
  
      // Save the token in the session
        req.session.token = token;

        res.status(200).send({ token });
    } catch (error) {
        console.log('err ->', error);
  
        res.status(500).json({
            message: error_message.TYPE_SERVER
        });
    }
};


const onClientRegister = async (req, res, { email, name, password }) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    try {
        const [rows] = await dbConnection.query('SELECT emailAddress from user_accounts WHERE emailAddress = ?', [email]);
        if (rows.length > 0) {
            res.status(400).json({ message: 'This email already registered!' });
            return;
        }
        
        const insertQuery = `INSERT INTO user_accounts (fullName, userPassword, emailAddress) VALUES (?, ?, ?)`;
        const values = [name, hashedPassword, email];
        await dbConnection.query(insertQuery, values); 

        const result = await dbConnection.query('SELECT LAST_INSERT_ID() AS ID');
        const insertedId = result[0].id;

        return onClientFinishAuthentication(req, res, insertedId, name);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Something went wrong, please try again later!' });
    }

};

const onClientLogin = async (req, res, { email, password }) => {
    try {

        const [rows] = await dbConnection.query('SELECT * FROM user_accounts WHERE emailAddress = ? LIMIT 1', [email]);
        if(rows.length > 0) {
            const data = rows[0];
            const comparePassword = bcrypt.compareSync(password, data.userPassword);
            if(!comparePassword) {
                res.status(400).json({
                    message: error_message.TYPE_DATA
                });
                return;
            }
            else {
                return onClientFinishAuthentication(req, res, data.ID, data.fullName);

                // return
            }
        } 

        res.status(400).json({
            message: 'Invalid email or password. Please try again.'
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error_message.TYPE_SERVER
        });
    }
};
  

export async function onUserAuthentication(req, res) {
    const authType = req.body.authType;

    if(authType === 'register') {
        onClientRegister(req, res, req.body);
    } else {
        onClientLogin(req, res, req.body);
    }
}