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

// Rendelések lekérése admin számára
app.get('/rendelesek', (req, res) => {
    db.query('SELECT * FROM rendelesek ORDER BY datum DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// Fagylaltok kezelése (CRUD)
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

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//bejelentkezés
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) {
      return res.status(400).send("Nincs ilyen user");
    }

    const user = result[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).send("Hibás jelszó");
    }

    res.send("Sikeres login!");
  });
});

//
app.get("/create-test", async (req, res) => {
  const hash = await bcrypt.hash("1234", 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    ["admin@gmail.com", hash],
    (err) => {
      if (err) return res.send(err);
      res.send("User létrehozva!");
    }
  );
});

//
app.listen(3000, () => {
  console.log("Server fut a 3000-es porton");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    (err) => {
      if (err) {
        return res.status(400).send("User már létezik!");
      }
      res.send("Sikeres regisztráció!");
    }
  );
});

function register() {
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  alert(await res.text());
}

if (!email.includes("@")) {
  return res.send("Nem valid email!");
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Hiányzó adatok!");
  }

  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hash],
    (err) => {
      if (err) {
        return res.status(400).send("Ez az email már létezik!");
      }
      res.send("Sikeres regisztráció!");
    }
  );
});