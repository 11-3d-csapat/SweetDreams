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

app.get('/rendelesek', (req, res) => {
    db.query('SELECT * FROM rendelesek ORDER BY datum DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/fagylaltok', (req, res) => {
    db.query('SELECT * FROM fagylaltok', (err, results) => {
        err ? res.status(500).json({ error: err.message }) : res.json(results);
    });
});

app.post('/api/fagylaltok', (req, res) => {
    const { nev, ar_kis, ar_nagy } = req.body;
    db.query('INSERT INTO fagylaltok (nev, ar_kis, ar_nagy) VALUES (?, ?, ?)',
        [nev, ar_kis, ar_nagy],
        (err, result) => {
            err ? res.status(500).json({ error: err.message }) : res.json({ id: result.insertId });
        });
});

app.delete('/api/fagylaltok/:id', (req, res) => {
    db.query('DELETE FROM fagylaltok WHERE id = ?', [req.params.id], (err) => {
        err ? res.status(500).json({ error: err.message }) : res.json({ success: true });
    });
});
