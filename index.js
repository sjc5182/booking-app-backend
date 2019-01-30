const express = require('express');
const path = require('path');
const { Pool, Client } = require('pg');

const sequelize = require('./app/config/db.config');

sequelize.authenticate().then(() => console.log('Database connect...')).catch(err => console.log('Error' + err))



const pool = new Pool(sequelize);

// pool.query('SELECT * from FoodIngd', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT * FROM public."FoodIngd" WHERE id = 1', (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
})

const app = express();

app.get('/', (req, res) => res.send('Index'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));