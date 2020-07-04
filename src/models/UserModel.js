const connection = require("../database/connection");
const { deleteCard } = require("../controllers/UserController");

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

    async createCard(user_id, payment_card) {
        console.log("Creating card...")
        const result = await connection("payment_cards")
            .insert(payment_card)
            
        console.log("result:" + payment_card.id);

        await connection("users")
            .where({id: user_id})
            .update({payment_cards_id: payment_card.id})
        console.log("Card registered!");
        return result;
    },

    async deleteCard(id){
        console.log("Deleting card...")
        const result = await connection("payment_cards")
            .where("id", "=", id)
            .delete();
        console.log("Card deleted!");
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