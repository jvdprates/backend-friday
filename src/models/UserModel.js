const connection = require("../database/connection");

module.exports = {
    async createUser(user) {
        console.log("Creating User: " + user.name);
        const result = await connection("users")
            .insert(user);
        console.log("User Created!");
        return result;
    },

    async readOneUser(user_id) {
        console.log("Finding User: " + user_id);
        const result = await connection("users")
            .where({ id: user_id })
            .select("*")
            .first();
        return result;
    },

    async updateUser(user_id, user) {
        console.log("Updating User: " + user_id);
        const result = await connection("users")
            .where({ id: user_id })
            .update(user);
        console.log("User Updated!");
        return result;
    },

    async deleteUser(user_id) {
        console.log("Deleting User: " + user_id);
        const result = await connection("users")
            .where({ id: user_id })
            .delete();
        console.log("User Deleted!");
        return result;
    },
}