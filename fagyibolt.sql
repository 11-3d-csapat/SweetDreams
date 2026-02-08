
-- FAGYLALTOK TÁBLA
CREATE TABLE fagylaltok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50),
    kategoria VARCHAR(50),
    ar_kis INT,
    ar_nagy INT
);

INSERT INTO fagylaltok (nev, kategoria, ar_kis, ar_nagy) VALUES
('Csoki', 'Fagylalt', 450, 650),
('Vanília', 'Fagylalt', 450, 650),
('Eper', 'Fagylalt', 450, 650),
('Citrom', 'Fagylalt', 450, 650),
('Rumos dió', 'Fagylalt', 450, 650),
('Oreó', 'Fagylalt', 450, 650),
('Pisztácia', 'Fagylalt', 450, 650),
('Ananász', 'Fagylalt', 450, 650),
('Mangó', 'Fagylalt', 450, 650),
('Puncs', 'Fagylalt', 450, 650);


-- KIEGÉSZÍTŐK TÁBLA
CREATE TABLE kiegeszitok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(50),
    ar INT
);

INSERT INTO kiegeszitok (nev, ar) VALUES
('Cukorszórás', 200),
('Roletti', 300),
('Sima tölcsér', 150),
('Édes tölcsér', 150);


-- ALLERGÉNEK TÁBLA
CREATE TABLE allergenek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    termek VARCHAR(50),
    allergenek VARCHAR(255)
);

INSERT INTO allergenek (termek, allergenek) VALUES
('Csoki', 'tej, laktóz'),
('Vanília', 'tej, laktóz'),
('Eper', 'tej, laktóz'),
('Citrom', 'tej, laktóz'),
('Rumos dió', 'tej, laktóz, dió'),
('Oreó', 'tej, laktóz, glutén, szója'),
('Pisztácia', 'tej, laktóz, mogyoró'),
('Ananász', 'tej, laktóz'),
('Mangó', 'tej, laktóz'),
('Puncs', 'tej, laktóz, tojás'),
('Cukorszórás', 'Allergénmentes'),
('Roletti', 'glutén, tej, laktóz'),
('Sima tölcsér', 'glutén, tojás'),
('Édes tölcsér', 'glutén, tojás, tej, laktóz');
