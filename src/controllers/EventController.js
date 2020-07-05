const BarModel = require("../models/EventModel");
const EventModel = require("../models/EventModel");

module.exports = {
  async create(request, response) {
    try {
      let event = request.body;
      const result = await EventModel.createEvent(event);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Event creation failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to create event",
        });
    }
  },

  async getAll(request, response) {
    try {
      const result = await EventModel.getAllEvents();
      return response.status(200).json(result);
    } catch (err) {
      console.log("Event reading failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to get events",
        });
    }
  },

  async getOne(request, response) {
    try {
      const { id } = request.params;
      const result = await EventModel.getOneEvent(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Event reading failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to get one event",
        });
    }
  },

  async update(request, response) {
    try {
      let { id } = request.params;
      let event = request.body;
      const result = await EventModel.updateEvent(id, event);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Event updating failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to update event",
        });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await EventModel.deleteEvent(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Event deletion failed: " + err);
      return response
        .status(500)
        .json({
          notification: "Internal server error while trying to delete Event",
        });
    }
  },
};
