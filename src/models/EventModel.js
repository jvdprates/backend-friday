const connection = require("../database/connection");

module.exports = {
    async createEvent(event) {
        console.log("Creating event: " + event.name);
        const result = await connection("events")
            .insert(event);
        console.log("Event Created!");
        return result;
    },

    async getOneEvent(event_id) {
        console.log("Getting one event...");
        const result = await connection("events")
            .where("id", "=", event_id)
            .select("*")
            .first();
        return result;
    },

    async getAllEvents() {
        console.log("Getting all events...");
        const result = await connection("events")
            .select("*")
        return result;
    },

    async updateEvent(event, event_id) {
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
}