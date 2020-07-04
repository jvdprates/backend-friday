const connection = require("../database/connection");

module.exports = {
    async createBar(bar) {
        console.log("Creating Bar: " + bar.name);
        const result = await connection("bars")
            .insert(bar);
        console.log("Bar Created!");
        return result;
    },

    async getAllBars() {
        const result = await connection("bars")
            .select('*');
        return result;
    },

    async getOneBar(bar_id) {
        console.log("Finding Bar: " + bar_id);
        const result = await connection("bars")
            .where({ id: bar_id })
            .select("*")
            .first();
        return result;
    },

    async updateBar(bar, bar_id) {
        console.log("Updating Bar: " + bar_id);
        const result = await connection("bars")
            .where({ id: bar_id })
            .update(bar);
        console.log("Bar Updated!");
        return result;
    },

    async deleteBar(bar_id) {
        console.log("Deleting Bar: " + bar_id);
        const result = await connection("bar")
            .where({ id: bar_id })
            .delete();
        console.log("Bar Deleted!");
        return result; 
    },
}