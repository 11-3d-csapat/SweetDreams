const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fagyibolt'
});

db.connect(() => console.log('MySQL OK'));
app.use(express.static('SweetDreams'));

app.get('/fagylaltok', (req, res) => {
    db.query('SELECT * FROM fagylaltok', (err, results) => {
        err ? res.status(500).send(err.message) : res.json(results);
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));