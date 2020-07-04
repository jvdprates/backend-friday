const UserModel = require('../models/UserModel');


module.exports = {
    async create(request, response) {
        try {
            let user = request.body;
            const result = await UserModel.createUser(user);
            return response.status(200).json(result);
        } catch (err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create user" });
        }
    },

    async readOne(request, response) {
        try {
            let { id } = request.params;
            const result = await UserModel.readOneUser(id);
            return response.status(200).json(result);
        } catch (err) {
            console.log("User reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get one user" });
        }
    },

    async update(request, response) {
        try {
            let { id } = request.params;
            let user = request.body;
            const result = await UserModel.updateUser(id, user);
            return response.status(200).json(result);
        } catch (err) {
            console.log("User updating failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to update user" });
        }
    },

    async newCard(request, response) {
        try {
            let { user_id } = request.params;
            let payment_card = request.body;
            const result = await UserModel.createCard(user_id, payment_card);
            return response.status(200).json(result);
        } catch (err) {
            console.log("Card creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create card" });
        }
    },

    async deleteCard(request, response) {
        try {
            let { id } = request.params;
            const result = await UserModel.deleteCard(id);
            return response.status(200).json(result);
        } catch (err) {
            console.log("Card deletion failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete card" });
        }
    },

    async delete(request, response) {
        try {
            let { id } = request.params;
            const result = await UserModel.deleteUser(id);
            return response.status(200).json(result);
        } catch (err) {
            console.log("User deletion failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete user" });
        }
    },
}