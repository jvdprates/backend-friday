const connection = require("../database/connection");

module.exports = {
  async createEvent(event) {
    console.log("Creating event: " + event.name);
    const result = await connection("events").insert(event);
    console.log("Event Created!");
    return result;
  },

  async getOneEvent(event_id) {
    console.log("Getting one event...");
    const result = await connection("events as e")
      .where("e.id", "=", event_id)
      .join("bars as b", "e.bars_id", "=", "b.id")
      .select("*", "e.description as event_description")
      .first();
    return result;
  },

  async getAllEvents() {
    console.log("Getting all events...");
    const result = await connection("events AS e")
      .join("bars AS b", "e.bars_id", "b.id")
      .select(
        "e.img_link AS event_image_link",
        "e.category AS event_category",
        "e.id AS event_id",
        "e.description AS event_description",
        "b.*"
      );
    return result;
  },

  async updateEvent(event_id, event) {
    console.log("Updating event: " + event.name);
    const result = await connection("events")
      .where("id", "=", event_id)
      .update(event);
    console.log("Event Created!");
    return result;
  },

  async deleteEvent(event_id) {
    console.log("Deleting event...");
    const result = await connection("events")
      .where("id", "=", event_id)
      .delete();
    console.log("Event Deleted!");
    return result;
  },
};
