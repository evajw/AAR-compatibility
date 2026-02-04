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

<<<<<<< HEAD
//basic route
app.get("/hello", (req, res) => {
    res.send("Hello from your Node.js backend");
=======
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

//Logging all the browser requests in the terminal. This is a control on the proper working of the server
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
>>>>>>> backend
});


//For seperating js files and create more overview it is possible to reroute in express using the following expression
const tablesRouter = require('./tables')(pool);

//Refering to using the tables.js file
app.use('/tables', tablesRouter);

//basic route
app.get("/hello", (req, res) => {
    console.log("Hello");
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



app.post("/submit", async (req, res) => {
    const {
        input1: tankerNation,
        input2: tankerType,
        input3: tankerModel,
        input4: receiverNation,
        input5: receiverType,
        input6: receiverModel
    } = req.body;

    try {
        const result = await pool.query(`
            SELECT result FROM compatibility
            WHERE tanker_nation = $1
            AND tanker_type = $2
            AND tanker_model =$3
            AND receiver_nation =$4
            AND receiver_type = $5
            AND receiver_model = $6`,
            [tankerNation, tankerType, tankerModel, receiverNation, receiverType, receiverModel]
        );

<<<<<<< HEAD
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
=======
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
>>>>>>> backend
        }

    } catch (err) {
            console.error(err);
            return res.status(500).render("result", {
                found: false,
                message: "Database error"
            });
    }    
});

app.post("/search", async (req, res) => {
    console.log("POST /search received:", req.body)
    const {
        tankerNation,
        tankerType,
        tankerModel,
        receiverNation,
        receiverType,
        receiverModel
    } = req.body;

    try {
        // Find the matching compatibility
        const compResult = await pool.query(
            `
            SELECT c.id AS comp_id
            FROM compatibility c
            JOIN tankers t ON c.tanker_id = t.id
            JOIN receivers r ON c.receiver_id = r.id
            WHERE t.nation = $1
              AND t.type = $2
              AND t.model = $3
              AND r.nation = $4
              AND r.type = $5
              AND r.model = $6
            `,
            [tankerNation, tankerType, tankerModel, receiverNation, receiverType, receiverModel]
        );

        if (compResult.rows.length === 0) {
            return res.render("search_results", { found: false, message: "No matching compatibility found." });
        }

        const compId = compResult.rows[0].comp_id;

        // Get the specifications for this compatibility
        const specResult = await pool.query(
            "SELECT * FROM specifications WHERE compatibility_id = $1",
            [compId]
        );

        if (specResult.rows.length === 0) {
            return res.render("search_results", { found: false, message: "No specifications found for this combination." });
        }

        res.render("search_results", { found: true, spec: specResult.rows[0] });

    } catch (err) {
        console.error(err);
        res.status(500).render("search_results", { found: false, message: "Database error" });
    }
});

app.post('/api/get-valid-options', async (req, res) => {
    const { t_nation, t_model, t_type, r_nation, r_model, r_type } = req.body;
    
    // We build a query that joins everything to see what is still 'possible'
    // This query looks at the compatibility table and returns all valid unique combinations
    let query = `
        SELECT 
            t.nation as t_nation, t.model as t_model, t.type as t_type,
            r.nation as r_nation, r.model as r_model, r.type as r_type
        FROM compatibility c
        JOIN tankers t ON c.tanker_id = t.id
        JOIN receivers r ON c.receiver_id = r.id
        WHERE 1=1
    `;
    
    // Add filters only if the user has selected them
    const params = [];
    if (t_nation) { params.push(t_nation); query += ` AND t.nation = $${params.length}`; }
    if (t_model) { params.push(t_model); query += ` AND t.model = $${params.length}`; }
    // ... repeat for all 6 fields ...

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


<<<<<<< HEAD
        res.json(rows); 
    } catch (err)
        {console.error(err);
        res.status(500).json({ error: "server error"})
});  
=======
>>>>>>> backend

//Start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});