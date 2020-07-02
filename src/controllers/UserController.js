const UserModel = require('../models/UserModel');

module.exports = {
    async create(request, response) {
        try {
            let user = request.body;
            const result = await UserModel.createUser(user);
            return response.status(200).json(result);
        } catch(err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create user" });
        }
    },

    async readOne(request, response) {
        try {
            let { id } = request.params;
            const result = await UserModel.readOneUser(id);
            return response.status(200).json(result);
        } catch(err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get one user" });
        }
    },

    async update(request, response) {
        try {
            let { id } = request.params;
            let user = request.body;
            const result = await UserModel.updateUser(id, user);
            return response.status(200).json(result);
        } catch(err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to update user" });
        }
    },

    async delete(request, response) {
        try {
            let { id } = request.params;
            const result = await UserModel.deleteUser(id);
            return response.status(200).json(result);
        } catch(err) {
            console.log("User creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete user" });
        }
    },
}