const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require('./database/connection');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
