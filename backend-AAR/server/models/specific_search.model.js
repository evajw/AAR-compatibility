const pool = require('../config/db'); // PostgreSQL pool connection

const TankerModel = {
  // Get distinct countries
  async getCountries() {
    const res = await pool.query('SELECT DISTINCT country FROM tankers ORDER BY country;');
    return res.rows;
  },

  // Get distinct tanker types for a country
  async getTypesByCountry(country) {
    const res = await pool.query(
      'SELECT DISTINCT type FROM tankers WHERE country = $1 ORDER BY type;',
      [country]
    );
    return res.rows;
  },

  // Get distinct tanker models for a country + type
  async getModelsByCountryAndType(country, type) {
    const res = await pool.query(
      'SELECT DISTINCT model FROM tankers WHERE country = $1 AND type = $2 ORDER BY model;',
      [country, type]
    );
    return res.rows;
  },

  async getCompatibleReceivers(country, type, model) {
    const res = await pool.query(
      `
      SELECT r.id, r.country, r.type, r.model
      FROM compatibility c
      JOIN tankers t ON t.id = c.tanker_id
      JOIN tankers r ON r.id = c.receiver_id
      WHERE t.country = $1 AND t.type = $2 AND t.model = $3
      ORDER BY r.country, r.type, r.model;
      `,
      [country, type, model]
    );
    return res.rows;
  }
};

module.exports = TankerModel;