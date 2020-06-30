const connection = require("../database/connection");
const { response } = require("express");

module.exports = {
    async createUser(user) {
        console.log("Creating User: " + user.name);
        const response = await connection("users")
            .insert(user);
        console.log("User Created!");
        return response;
    },

    async readOneUser(user_id) {
        console.log("Finding User: " + user_id);
        const response = await connection("users")
            .where({ id: user_id })
            .select("*")
            .first();
        return response;
    },

    async updateUser(user_id, user) {
        console.log("Updating User: " + user_id);
        const response = await connection("users")
            .where({ id: user_id })
            .update(user);
        console.log("User Updated!");
        return response;
    },

    async deleteUser(user_id) {
        console.log("Deleting User: " + user_id);
        const response = await connection("users")
            .where({ id: user_id })
            .delete();
        console.log("User Deleted!");
        return response;
    },
}