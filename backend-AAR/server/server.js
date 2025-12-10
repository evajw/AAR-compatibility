const express = require("express");
const pkg = require("pg");
const db = require('./db');
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

module.exports = pool;

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

// Catch all other routes
app.all('*', (req, res) => {
  res.status(404).send('404 - Page not found');
});


//Handle form submission
app.post('/specifications', async (req, res) => {
  try {
        const { tanker_nation, receiver} = req.body;

    if (!tanker_nation || !tanker_model || !tanker_type ||
            !receiver_nation || !receiver_model || !receiver_type) {
            return res.status(400).json({ error: "Tanker and receiver are needed"})}
        }

        const [rows] = await db.query(
        `select specifications * FROM specifications s
        JOIN tankers t on s.c_tanker = t.model
        JOIN receivers r on s.c_receiver = r.model
        WHERE t.model =? and r.mode =?`
        [tanker, receiver]);

        if (rows.length === 0) {
            return res.status(404).json({message: "no specifications found"})
    }

        res.json(rows); 
    } catch (err)
        {console.error(err);
        res.status(500).json({ error: "server error"})
});  

//Start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});