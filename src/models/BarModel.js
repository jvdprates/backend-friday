const connection = require("../database/connection");

module.exports = {
    async createBar(bar) {
        console.log("Creating Bar: " + bar.name);
        const response = await connection("bars")
            .insert(bar);
        console.log("Bar Created!");
        return response;
    },

    async readOneBar(bar_id) {
        console.log("Finding Bar: " + bar_id);
        const response = await connection("bars")
            .where({ id: bar_id })
            .select("*")
            .first();
        return response;
    },

    async updateBar(bar, bar_id) {
        console.log("Updating Bar: " + bar_id);
        const response = await connection("bars")
            .where({ id: bar_id })
            .update(bar);
        console.log("Bar Updated!");
        return response;
    },

    async deleteBar(bar_id) {
        console.log("Deleting Bar: " + bar_id);
        const response = await connection("bar")
            .where({ id: bar_id })
            .delete();
        console.log("Bar Deleted!");
        return response; 
    },
}