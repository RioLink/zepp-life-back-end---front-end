require('dotenv').config()

const mysql = require('mysql2')

const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
