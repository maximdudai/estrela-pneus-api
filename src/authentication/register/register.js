const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.post('/register', (req, res) => {
    const { 
        fName, 
        sName,
        userBirth,
        userPass,
        userEmail, 
        userContact
    } = req.body;

    const hashedPassword = bcrypt.hashSync(userPass, 10);

    const sql = `INSERT INTO users 
        (firstName, secondName, userBirth, userPassword, emailAddress, userContact) 
        VALUES 
        (
            '${fName}',
            '${sName}',
            '${userBirth}',
            '${hashedPassword}',
            '${userEmail}',
            '${userContact}',
        )`;
    
    db.query(sql, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const token = jwt.sign({ userEmail }, 'secret');
        res.status(200).send({ token });
      }
    });
  });
  