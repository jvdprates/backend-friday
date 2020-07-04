const connection = require("../database/connection");

module.exports = {
    async createCard(user_id, payment_card) {
        const currentCard = await connection('users')
            .where({ id: user_id })
            .select("payment_cards_id as card_id")
            .first();

        console.log("Current card: " + currentCard.card_id);
        console.log("Creating card...")
        const result = await connection("payment_cards")
            .insert(payment_card);

        console.log("result:" + result);

        if (currentCard.card_id === null) {
            await connection("users")
                .where({ id: user_id })
                .update({ payment_cards_id: payment_card.id })
            console.log("Card registered!");
            return payment_card;
        } else {
            console.log("Deleting card: " + currentCard.card_id);
            const deleted = await connection("payment_cards")
                .where({ id: currentCard.card_id })
                .delete();
            console.log("Card deleted!");
            const updated = await connection("users")
                .where({ id: user_id })
                .update({ payment_cards_id: payment_card.id })
            console.log("New card associated!");
            return payment_card;
        }
    },

    async deleteCard(user_id) {
        const user = await connection("users")
            .where({ id: user_id })
            .select("payment_cards_id as id")
            .first();
        console.log("Deleting card: " + user.id);
        if (user.id !== null) {
            const result = await connection("payment_cards")
                .where("id", "=", user.id)
                .delete();
            console.log("Card deleted!");
            return result;
        } else {
            return ({notification: "You have no registered cards!"});
        }
    },
}