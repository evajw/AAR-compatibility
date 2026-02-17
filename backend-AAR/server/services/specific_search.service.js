const TankerModel = require('../models/specific_search.model');

const TankerService = {
  async getCountries() {
    return await TankerModel.getCountries();
  },

  async getTypes(country) {
    if (!country) throw new Error('Country is required');
    return await TankerModel.getTypesByCountry(country);
  },

  async getModels(country, type) {
    if (!country || !type) throw new Error('Country and Type are required');
    return await TankerModel.getModelsByCountryAndType(country, type);
  },

  async getCompatibleReceivers(country, type, model) {
    if (!country || !type || !model)
      throw new Error('Country, Type, and Model are required');
    return await TankerModel.getCompatibleReceivers(country, type, model);
  }
};

module.exports = TankerService;
