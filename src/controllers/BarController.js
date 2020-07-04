const BarModel = require("../models/BarModel");
const { uploadFile } = require("../models/GoogleDriveModel");

module.exports = {
  async create(request, response) {
    try {
      let image_id;

      if (request.file) {
        const { originalname, buffer, mimetype } = request.file;
        image_id = await uploadFile(buffer, originalname, mimetype);
      }

      const bar = request.body;
      bar.image_id = image_id;

      const result = await BarModel.createBar(bar);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Bar creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create bar",
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await BarModel.getAllBars();
      return response.status(200).json(result);
    } catch (err) {
      console.log("Bar reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get all bars",
      });
    }
  },

  async getOne(request, response) {
    try {
      let { id } = request.params;
      const result = await BarModel.getOneBar(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Bar reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get one bar",
      });
    }
  },

  async update(request, response) {
    try {
      let { id } = request.params;
      let bar = request.body;
      const result = await BarModel.updateBar(id, bar);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Bar updating failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to update bar",
      });
    }
  },

  async delete(request, response) {
    try {
      let { id } = request.params;
      const result = await BarModel.deleteBar(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Bar deletion failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete bar",
      });
    }
  },
};
