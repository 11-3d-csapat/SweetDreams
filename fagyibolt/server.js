const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fagyibolt'
});

db.connect((err) => {
    if (err) {
        console.log('MySQL hiba:', err.message);
    } else {
        console.log('MySQL OK');
    }
});

app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/api/rendelesek', (req, res) => {
    db.query('SELECT * FROM rendelesek ORDER BY datum DESC', (err, results) => {
        if (err) {
            res.status(500).json([]);
        } else {
            res.json(results);
        }
    });
});

app.get('/api/fagylaltok', (req, res) => {
    db.query('SELECT * FROM fagylaltok', (err, results) => {
        if (err) {
            res.status(500).json([]);
        } else {
            res.json(results);
        }
    });
});

app.get('/api/allergenek', (req, res) => {
    db.query('SELECT * FROM allergenek', (err, results) => {
        if (err) {
            res.status(500).json([]);
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
