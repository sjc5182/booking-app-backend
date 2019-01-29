const express = require('express');
const path = require('path');

const sequelize = require('./app/config/db.config');

sequelize.authenticate()
  .then(() => console.log('Database connect...'))
  .catch(err => console.log('Error' + err))

const app = express();

app.get('/', (req, res) => res.send('Index'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));