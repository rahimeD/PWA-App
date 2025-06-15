const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");

const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pwa_app"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL verbunden");
});

app.post("/login", (req, res) => {
    console.log("Login Attempt:", req.body);
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) {
                console.error("DB Error:", err);
                return res.status(500).send(err);
            }
            console.log("DB Results:", results);
            if (results.length > 0) {
                res.send({ success: true });
            } else {
                res.send({ success: false, message: "Falsche Anmeldeinformationen" });
            }
        }
    );
});

app.get("/jobs", (req, res) => {
    db.query("SELECT * FROM jobs WHERE start_time = '15:00:00'", (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});


app.listen(3000, '0.0.0.0', () => {
    console.log("Server läuft auf Port 3000--1");
});

// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     db.query(
//         "SELECT * FROM users WHERE username = ? AND password = ?",
//         [username, password],
//         (err, results) => {
//             if (err) return res.status(500).send(err);
//             if (results.length > 0) {
//                 res.send({ success: true });
//             } else {
//                 res.send({ success: false, message: "Falsche Anmeldeinformationen" });
//             }
//         }
//     );
// });



