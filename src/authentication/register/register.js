const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/Authentication', (req, res) => {
    const { 
        userEmail,
        fullName,
        userPass
    } = req.body;

    const hashedPassword = bcrypt.hashSync(userPass, 10);

    const sql = `INSERT INTO users 
        (emailAddress, fullName, userPassword)
        VALUES 
        (
            '${userEmail}',
            '${fullName}',
            '${userPass}'
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
  