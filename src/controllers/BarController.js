const BarModel = require('../models/BarModel');

module.exports = {
    async create(request, response) {
        try {
            let bar = request.body;
            const result = await BarModel.createBar(bar);
            return response.json(result);
        } catch(err) {
            console.log("Bar creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create bar" });
        }
    },

    async readOne(request, response) {
        try {
            let { id } = request.params;
            const result = await BarModel.readOneBar(id);
            return response.json(result);
        } catch(err) {
            console.log("Bar creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get one bar" });
        }
    },

    async update(request, response) {
        try {
            let { id } = request.params;
            let bar = request.body;
            const result = await BarModel.updateBar(id, bar);
            return response.json(result);
        } catch(err) {
            console.log("Bar creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to update bar" });
        }
    },

    async delete(request, response) {
        try {
            let { id } = request.params;
            const result = await BarModel.deleteBar(id);
            return response.json(result);
        } catch(err) {
            console.log("Bar creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete bar" });
        }
    },
}