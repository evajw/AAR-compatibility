const express = require("express");
const pkg = require("pg");
<<<<<<< HEAD
=======
const db = require('./db');
>>>>>>> database
const app = express();
const path = require("path");

const { Pool } = pkg;
const PORT = 3000;

<<<<<<< HEAD
=======

>>>>>>> database
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
=======
module.exports = pool;
>>>>>>> database

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

<<<<<<< HEAD
app.set("view engine", "ejs")

app.post("/submit", (req, res) => {
    const {
        input1: tankerNation,
        input2: tankerType,
        input3: tankerModel,
        input4: receiverNation,
        input5: receiverType,
        input6: receiverModel
    } = req.body;

    try {
        const result = await pool.query = (`
            SELECT result FROM compatibility
            WHERE tanker_nation = $1
            AND tanker_type = $2
            AND tanker_model =$3
            AND receiver_nation =$4
            AND receiver_type = $5
            AND receiver_model = $6`,
            [tankerNation, tankerType, tankerModel, receiverNation, receiverType, receiverModel]
        );

        if (result.rows.length>0) {
            res.render("compatibility", {
                found: true,
                tankerNation,
                tankerType,
                tankerModel,
                receiverNation,
                receiverType,
                receiverModel,
                result: result.rows[0].result
            });
        } else {
            res.render("compatibility", {
                found: false,
                tankerNation,
                tankerType,
                tankerModel,
                receiverNation,
                receiverType,
                receiverModel,
                message: "No compatibility data found"
            });
        }

    } catch (err) {
            console.error(err);
            return res.status(500).render("result", {
                found: false,
                message: "Database error"
            });
    }    
});

// app.get("/", (req, res) => {
//     db.serialize(() => {
//         db.all("SELECT DISTINCT tanker_nation FROM compatibility", (e1, tanker) => {
//             db.all("SELECT DISTINCT tanker_type FROM compatibility", (e2, tankerType) => {
//                 db.all("SELECT DISTINCT tanker_model FROM compatibility", (e3, tankerModel) => {
//                     db.all("SELECT DISTINCT receiver_nation FROM compatibility", (e4, receiver) => {
//                         db.all("SELECT DISTINCT receiver_type FROM compatibility", (e5, receiverType) => {
//                             db.all("SELECT DISTINCT receiver_model FROM compatiblity", (e6, receiverModel))

//                             res.render("index", {
//                                 tanker,
//                                 tankerType,
//                                 tankerModel,
//                                 receiver,
//                                 receiverType,
//                                 receiverModel
//                             });
//                         });     
//                     });
//                 });
//             });
//         });
//     });
// });


=======
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
>>>>>>> database

//Start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});