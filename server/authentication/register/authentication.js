import bcrypt, { hash } from 'bcrypt';
import dbConnection from '../../database/connection.js';
import authToken from 'jsonwebtoken';

const error_message = {
    TYPE_DATA: 'Incorrect email address or password.',
    TYPE_SERVER: 'Internat sever error'
}

const generateAuthenticationTokenJWT = () => {
    const token = authToken.sign({ password }, 'secret');
    return res.status(200).send({ token });
};

const onClientRegister = async (res, {email, name, password}) => {
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

        generateAuthenticationTokenJWT();
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Something went wrong, please try again later!' });
    }

};

const onClientLogin = async (res, { email, password }) => {
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
                return generateAuthenticationTokenJWT()
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
        onClientRegister(res, req.body);
    } else {
        onClientLogin(res, req.body);
    }
}