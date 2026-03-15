const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/rendeles', (req, res) => {
    const { nev, telefonszam, osszeg } = req.body;
    
    db.query(
        'INSERT INTO rendelesek (nev, telefonszam, vegosszeg, datum) VALUES (?, ?, ?, NOW())',
        [nev, telefonszam, osszeg],
        (err) => {
            if (err) {
                res.send('Hiba: ' + err.message);
            } else {
                res.send('Rendelés sikeresen mentve!');
            }
        }
    );
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));