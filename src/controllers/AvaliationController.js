const AvaliationModel = require("../models/AvaliationModel");

module.exports = {
  async create(request, response) {
    try {
      const { id } = request.session; //SESSAO
      avaliation = request.body;

      avaliation.users_id = id;

      const result = await AvaliationModel.create(avaliation);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Avaliation creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create Avaliation",
      });
    }
  },

  async index(request, response) {
    try {
      const { bar_id } = request.params;
      const result = await AvaliationModel.index(bar_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Avaliation reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get categories",
      });
    }
  },

  async update(request, response) {
    try {
      const { id: user_id } = request.session; //SESSAO
      const { id } = request.params;
      const avaliation = request.body;
      const result = await AvaliationModel.update(id, user_id, avaliation);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Avaliation reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get categories",
      });
    }
  },

  async delete(request, response) {
    try {
      const { id: user_id } = request.session; //SESSAO
      const { id } = request.params;

      const result = await AvaliationModel.delete(id, user_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Avaliation deletion failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete Avaliation",
      });
    }
  },
};
