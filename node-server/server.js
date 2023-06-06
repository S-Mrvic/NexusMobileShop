const express = require('express');
const fs = require('fs');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nexus_webshop'
});

// Code
//Connectinf to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Successfully connected to database!');
});

app.use(express.json());

// We are adding the appropriate middleware for CORS
app.use(cors());

//GET request to "/phones.json"
app.get('/phones.json', (req, res) => {
  fs.readFile('phones.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(data);
    }
  });
});

//POST request to '/signin' endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('The user is successfully registered!');
      res.status(200).json({ message: 'The user is successfully registered!' });
    }
  });
});

//POST request to '/login' endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  //Query the database to fetch all users
  connection.query('SELECT * FROM users', (err, users) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return;
    }

    const user = users.find(u => u.username === username && u.password === password);
      
    if (user) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: true }));
    } else {
      res.statusCode = 401;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false }));
    }

  });

});

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});








