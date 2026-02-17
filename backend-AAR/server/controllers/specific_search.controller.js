const TankerService = require('../services/specific_search.service');

const TankerController = {
  async listCountries(req, res) {
    try {
      const countries = await TankerService.getCountries();
      res.json(countries);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async listTypes(req, res) {
    try {
      const { country } = req.query;
      const types = await TankerService.getTypes(country);
      res.json(types);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async listModels(req, res) {
    try {
      const { country, type } = req.query;
      const models = await TankerService.getModels(country, type);
      res.json(models);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // NEW: list compatible receivers
  async listCompatibleReceivers(req, res) {
    try {
      const { country, type, model } = req.query;
      const receivers = await TankerService.getCompatibleReceivers(country, type, model);
      res.json(receivers);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = TankerController;
