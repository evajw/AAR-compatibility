// src/models/compatibility.model.js
const pool = require('../config/db');

const CompatibilityModel = {
  async find(tankerNation, tankerType, tankerModel, receiverNation, receiverType, receiverModel) {
    const result = await pool.query(
      `SELECT result FROM compatibility
       WHERE tanker_nation = $1
         AND tanker_type = $2
         AND tanker_model = $3
         AND receiver_nation = $4
         AND receiver_type = $5
         AND receiver_model = $6`,
      [tankerNation, tankerType, tankerModel, receiverNation, receiverType, receiverModel]
    );
    return result.rows[0] || null;
  }
};

module.exports = CompatibilityModel;
