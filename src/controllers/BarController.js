const BarModel = require("../models/BarModel");
const { uploadFile } = require("../models/GoogleDriveModel");
const FirebaseModel = require("../models/FirebaseModel");

module.exports = {
  async create(request, response) {
    let firebaseUid;
    try {
      const bar = request.body;
      firebaseUid = await FirebaseModel.createNewUser(bar.email, bar.password);

      bar.firebase_id = firebaseUid;

      delete bar.password;

      let image_id;
      if (request.file) {
        const { originalname, buffer, mimetype } = request.file;
        image_id = await uploadFile(buffer, originalname, mimetype);
      }

      bar.image_id = image_id;

      const result = await BarModel.createBar(bar);

      return response.status(200).json(result);
    } catch (err) {
      if (firebaseUid) FirebaseModel.deleteUser(firebaseUid);

      console.log("Bar creation failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to create bar",
        });
    }
  },

  async index(request, response) {
    try {
      const { distance, alphabetic, lat, long } = request.query;
      let userPosition = {lat, long};
      let query = {distance, alphabetic};
      const result = await BarModel.index(userPosition, query);
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
      let { id } = request.session; //SESSAO
      let bar = request.body;
      const result = await BarModel.updateBar(id, bar);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Bar updating failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to update bar",
        });
    }
  },

  async delete(request, response) {
    try {
      let { id } = request.session; //SESSAO
      const bar = await BarModel.getOneBar(id);
      await FirebaseModel.deleteUser(bar.firebase_id);
      BarModel.deleteBar(id);
      return response
        .status(200)
        .json({ notification: `User ${bar.name} deleted!` });
    } catch (err) {
      console.log("Bar deletion failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to delete bar",
        });
    }
  },
};
