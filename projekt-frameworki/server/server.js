// server.js
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pizzeria",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Połączono z bazą danych MySQL.");
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.post("/api/sprawdz", (req, res) => {
  const { login, haslo } = req.body;

  const sql = `SELECT id FROM uzytkownicy WHERE login = '${login}' AND haslo = '${haslo}'`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Błąd logowania:", err);
      res.sendStatus(500);
    } else {
      if (result.length > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
  });
});

app.post("/api/zapisz", (req, res) => {
  const { login, haslo } = req.body;

  const sql = `INSERT INTO uzytkownicy (login, haslo) VALUES ('${login}', '${haslo}')`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.sendStatus(200);
  });
});

app.get("/api/dane", (req, res) => {
  const sql = "SELECT id, nazwa, skladniki, cena FROM pizze";

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.post("/api/zamowienie", (req, res) => {
  const formData = req.body;
  const pizzaName = formData.pizza;

  // Check if pizzaName is a valid string
  if (!pizzaName || typeof pizzaName !== "string") {
    console.error("Nieprawidłowa wartość nazwy pizzy:", pizzaName);
    res.sendStatus(400);
    return;
  }

  // Sprawdzenie poprawności wartości pizzaName
  const pizzaQuery = `SELECT id FROM pizze WHERE nazwa = '${pizzaName}'`;
  db.query(pizzaQuery, (err, result) => {
    if (err) {
      console.error(
        "Wystąpił błąd podczas sprawdzania poprawności wartości nazwy pizzy:",
        err
      );
      res.sendStatus(500);
    } else {
      if (result.length === 0) {
        console.error("Nieprawidłowa wartość nazwy pizzy:", pizzaName);
        res.sendStatus(400);
      } else {
        const pizzaId = result[0].id;

        // Wstawienie danych formularza do bazy danych
        const insertQuery = `INSERT INTO zamowienia (pizza, ilosc, sos, imie, nazwisko, adres, telefon, email, uwagi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
          pizzaId,
          formData.ilosc,
          formData.sos,
          formData.imie,
          formData.nazwisko,
          formData.adres,
          formData.telefon,
          formData.email,
          formData.uwagi,
        ];

        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error("Wystąpił błąd podczas zapisywania zamówienia:", err);
            res.sendStatus(500);
          } else {
            console.log("Zamówienie zostało zapisane w bazie danych");
            res.sendStatus(200);
          }
        });
      }
    }
  });
});

app.get("/api/zamowienia", (req, res) => {
  const query = `
    SELECT z.id, p.nazwa, z.pizza, z.ilosc, z.sos, z.imie, z.nazwisko, z.adres, z.telefon, z.email, z.uwagi, z.uzytkownikId
    FROM zamowienia z
    JOIN pizze p ON z.pizza = p.id
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Błąd podczas pobierania zamówień:", err);
      res
        .status(500)
        .json({ error: "Wystąpił błąd podczas pobierania zamówień." });
    } else {
      res.status(200).json(result);
    }
  });
});

app.delete("/api/zamowienie/:id", (req, res) => {
  const id = req.params.id;

  const deleteQuery = `DELETE FROM zamowienia WHERE id = ${id}`;

  db.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Wystąpił błąd podczas usuwania zamówienia:", err);
      res.sendStatus(500);
    } else {
      console.log(`Zamówienie o id ${id} zostało usunięte.`);
      res.sendStatus(200);
    }
  });
});

app.get("/api/zamowienia/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT z.id, p.nazwa, z.ilosc, z.sos, z.imie, z.nazwisko, z.adres, z.telefon, z.email, z.uwagi, z.uzytkownikId FROM zamowienia z JOIN pizze p ON z.pizza = p.id WHERE z.id = ${id} `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Błąd podczas pobierania danych zamówienia:", err);
      res
        .status(500)
        .json({ error: "Wystąpił błąd podczas pobierania danych zamówienia." });
    } else {
      if (result.length === 0) {
        res
          .status(404)
          .json({ error: "Nie znaleziono zamówienia o podanym ID." });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

app.get("/api/zamowienia1/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT z.id, p.nazwa, p.skladniki, p.cena, z.ilosc, z.sos, z.imie, z.nazwisko, z.adres, z.telefon, z.email, z.uwagi, z.uzytkownikId 
  FROM zamowienia z 
  JOIN pizze p ON z.pizza = p.id WHERE z.id = ${id} `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Błąd podczas pobierania danych zamówienia:", err);
      res
        .status(500)
        .json({ error: "Wystąpił błąd podczas pobierania danych zamówienia." });
    } else {
      if (result.length === 0) {
        res
          .status(404)
          .json({ error: "Nie znaleziono zamówienia o podanym ID." });
      } else {
        res.status(200).json(result[0]);
      }
    }
  });
});

app.put("/api/zamowionko/:id", (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const pizzaName = formData.pizza;

  // Check if pizzaName is a valid string
  if (!pizzaName || typeof pizzaName !== "string") {
    console.error("Nieprawidłowa wartość nazwy pizzy:", pizzaName);
    res.sendStatus(400);
    return;
  }

  // Sprawdzenie poprawności wartości pizzaName
  const pizzaQuery = `SELECT id FROM pizze WHERE nazwa = '${pizzaName}'`;
  db.query(pizzaQuery, (err, result) => {
    if (err) {
      console.error(
        "Wystąpił błąd podczas sprawdzania poprawności wartości nazwy pizzy:",
        err
      );
      res.sendStatus(500);
    } else {
      if (result.length === 0) {
        console.error("Nieprawidłowa wartość nazwy pizzy:", pizzaName);
        res.sendStatus(400);
      } else {
        const pizzaId = result[0].id;

        // Aktualizacja danych formularza w bazie danych
        const updateQuery = `UPDATE zamowienia SET pizza = ?, ilosc = ?, sos = ?, imie = ?, nazwisko = ?, adres = ?, telefon = ?, email = ?, uwagi = ? WHERE id = ${id}`;
        const values = [
          pizzaId,
          formData.ilosc,
          formData.sos,
          formData.imie,
          formData.nazwisko,
          formData.adres,
          formData.telefon,
          formData.email,
          formData.uwagi,
        ];

        db.query(updateQuery, values, (err, result) => {
          if (err) {
            console.error("Wystąpił błąd podczas aktualizowania zamówienia:", err);
            res.sendStatus(500);
          } else {
            console.log("Zamówienie zostało zaktualizowane w bazie danych");
            res.sendStatus(200);
          }
        });
      }
    }
  });
});



app.listen(port, () => {
  console.log(`Serwer Express nasłuchuje na porcie ${port}.`);
});
