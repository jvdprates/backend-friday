const BarModel = require('../models/BarModel');

module.exports = {
    async create(request, response) {
        try {
            let bar = request.body;
            const result = await BarModel.createBar(bar);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Bar creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create bar" });
        }
    },

    async index(request, response) {
        try {
            const result = await BarModel.readAllBars();
            return response.status(200).json(result);
        } catch(err) {
            console.log("Bar reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get all bars" });
        }
    },

    async getAll(request, response) {
        try {
            const result = await BarModel.getAllBars();
            return response.status(200).json(result);
        } catch(err) {
            console.log("Bar reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get all bars" });
        }
    },

    async getOne(request, response) {
        try {
            let { id } = request.params;
            const result = await BarModel.getOneBar(id);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Bar reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get one bar" });
        }
    },

    async update(request, response) {
        try {
            let { id } = request.params;
            let bar = request.body;
            const result = await BarModel.updateBar(id, bar);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Bar updating failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to update bar" });
        }
    },

    async delete(request, response) {
        try {
            let { id } = request.params;
            const result = await BarModel.deleteBar(id);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Bar deletion failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete bar" });
        }
    },
}