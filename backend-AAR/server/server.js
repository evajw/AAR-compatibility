const express = require("express");
const pkg = require("pg");
const app = express();

const { Pool } = pkg;
const PORT = 3000;


const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

//basic route
app.get("/", (req, res) => {
    res.send("Hello from your Node.js backend");
});

app.get("/users", async (req, res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
});

//Start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});