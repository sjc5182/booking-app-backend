const express = require('express');
const path = require('path');
const { Pool, Client } = require('pg');
const cors = require('cors');


const config = {
  database: 'booking_db',
  username: 'postgres',
  password: 'kalin1987',
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
//const sequelize = require('./app/config/db.config');

//sequelize.authenticate().then(() => console.log('Database connect...')).catch(err => console.log('Error' + err))



const pool = new Pool(config);

const app = express();

app.use(cors());

app.get('/food', (request, response) => {
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err)
    }
    else {
      db.query('SELECT * FROM public."FoodIngd"', (err, table) => {
        done();
        if(err) {
          return response.status(400).send(err)
        }
        else {
          return response.status(200).send(table.rows)
        }
      })
    }
  })
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));