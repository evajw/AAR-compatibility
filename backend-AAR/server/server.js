const express = require("express");
const pkg = require("pg");
const app = express();
const path = require("path");

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
app.get("/hello", (req, res) => {
    res.send("Hello from your Node.js backend");
});


//All routes
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/compatibility", async (req, res) => {
    res.sendFile(path.join(__dirname, "views", "compatibility.html"));
});

app.get("/form", async (req, res) => {
    res.sendFile(path.join(__dirname, "views", "form.html"));
});

app.get("/admin", async (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});


//Redirecting to routes
app.get("/home", (req, res) => {
    res.redirect("/")
})

//calling up the database
app.get("/api/tankers", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tankers");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Database error")
}
});


//Start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});