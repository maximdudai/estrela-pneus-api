const express = require('express')
const app = express()
const port = 3000

app.get('/Authentication', (req, res) => {
  res.send('Hello World!')
})

app.post('/Authentication', (req, res) => {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})