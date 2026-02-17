const TankerService = require('../services/specific_search.service');

const TankerPageController = {
  async showCountries(req, res) {
    const countries = await TankerService.getCountries();
    res.render('countries', { countries });
  },

  async showTypes(req, res) {
    const country = req.params.country;
    const types = await TankerService.getTypes(country);
    res.render('types', { country, types });
  },

  async showModels(req, res) {
    const { country, type } = req.params;
    const models = await TankerService.getModels(country, type);
    res.render('models', { country, type, models });
  },

  async showReceivers(req, res) {
    const { country, type, model } = req.params;
    const receivers = await TankerService.getCompatibleReceivers(country, type, model);
    res.render('receivers', { country, type, model, receivers });
  },
};

module.exports = TankerPageController;
