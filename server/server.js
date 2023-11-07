const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  const index = path.join(__dirname, '../index.html');
  return res.status(200).sendFile(index);
});

app.use('/build', express.static(path.join(__dirname, '../build')));

app.listen(3000, () => console.log('Server listening on 3000'));
