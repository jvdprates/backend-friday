const TablesModel = require("../models/TableModel");

module.exports = {
  async create(request, response) {
    try {
      const { id: bars_id } = request.session; //SESSAO
      const table = request.body;

      table.bars_id = bars_id;

      const result = await TablesModel.create(table);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Table creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create Table",
      });
    }
  },

  async index(request, response) {
    try {
      const { bar_id } = request.params;
      const result = await TablesModel.index(bar_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Table reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get tables",
      });
    }
  },

  async update(request, response) {
    try {
      const { id: bar_id } = request.session; //SESSAO
      const { id } = request.params;
      const table = request.body;
      const result = await TablesModel.update(id, bar_id, table);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Table reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get tables",
      });
    }
  },

  async delete(request, response) {
    try {
      const { id: bar_id } = request.session; //SESSAO
      const { id } = request.params;

      const result = await TablesModel.delete(id, bar_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Table deletion failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete Table",
      });
    }
  },
};
