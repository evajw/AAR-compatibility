// src/controllers/compatibility.controller.js
const service = require('../services/compatibility.service');

exports.hello = (req, res) => {
  res.send('Hello from your Node.js backend');
};

exports.submitCompatibility = async (req, res, next) => {
  try {
    const result = await service.submit(req.body);
    res.json(result); // JSON instead of render
  } catch (err) {
    next(err);
  }
};
