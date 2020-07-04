const BarModel = require('../models/EventModel');

module.exports = {
    async create(request, response) {
        try {
            let event = request.body;
            const result = await EventModel.createEvent(event);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Event creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create event" });
        }
    },
}