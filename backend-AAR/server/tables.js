const express = require('express')


module.exports = (pool) => {
    const router = express.Router();

    // GET /tables/tankers
    router.get("/tankers", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM tankers");
            res.json(result.rows);
        } catch (error) {
            console.error("DB ERROR MESSAGE:", error.message);
            console.error("DB ERROR STACK:", error.stack);
            res.status(500).json({
                error: error.message
            });
        };
    });
    
    // GET /tables/receivers
    router.get("/receivers", async (req, res) => {
        try {
            const result = await pool.query("SELECT * FROM receivers");
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }
    });

    // GET /tables/specifications
    router.get("/specifications", async (req, res) => {
        try {
            const result = await pool.query(`
                SELECT *
                FROM specifications
            `);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }
    });

    // GET /tables/compatibility
    router.get("/compatibility", async (req, res) => {
        try {
            const result = await pool.query(`
                SELECT *
                FROM compatibility
            `);
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }
    });

    return router;
};