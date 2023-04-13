const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('./database/connection');
// require('./authentication/register/register');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({ origin: 'http://localhost:5137' }));


app.use((req, res, next) => {
  res.status(400).send('Page not Found');
  console.log(req.method);
});


app.get('/Authentication', (req, res) => {
  res.status(404).send('Not found');
});


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
      console.log('asdadsda')
    } else {
      const token = jwt.sign({ userEmail }, 'secret');
      res.status(200).send({ token });
    }
  });
});


const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});