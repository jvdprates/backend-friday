const CardModel = require('../models/CardModel');

module.exports = {
    async newCard(request, response) {
        try {
            let { id } = request.session; //SESSAO
            let payment_card = request.body;
            const result = await CardModel.createCard(id, payment_card);
            return response.status(200).json(result);
        } catch (err) {
            console.log("Card creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create card" });
        }
    },
    
    async deleteCard(request, response) {
        try {
            let { id } = request.session; //SESSAO
            const result = await CardModel.deleteCard(id);
            return response.status(200).json(result);
        } catch (err) {
            console.log("Card deletion failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete card" });
        }
    },
}

