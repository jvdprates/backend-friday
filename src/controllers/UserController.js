const UserModel = require('../models/UserModel');
const FirebaseModel = require('../models/FirebaseModel');
const jwt = require('jsonwebtoken');

module.exports = {
    async create(request, response) {
        let firebaseUid;
        try {
            let user = request.body;
            firebaseUid = await FirebaseModel.createNewUser(user.email, user.password);

            user.firebase_id = firebaseUid;

            delete user.password;

            const accessToken = jwt.sign({ type: 'user', id: user.id }, process.env.ACCESS_TOKEN_SECRET);

            await UserModel.createUser(user);

            return response.status(200).json({ user, accessToken });
        } catch (err) {
            if (firebaseUid)
                FirebaseModel.deleteUser(firebaseUid)
            
            console.log("User creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create user" });
        }
    },

    async update(request, response) {
        try {
            let { id } = request.session; //SESSAO
            let user = request.body;
            const result = await UserModel.updateUser(id, user);
            return response.status(200).json(result);
        } catch (err) {
            console.log("User updating failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to update user" });
        }
    },

    async delete(request, response) {
        try {
            let { id } = request.session; //SESSAO
            const user = await UserModel.getOneUser(id);
            await FirebaseModel.deleteUser(user.firebase_id);
            await UserModel.deleteUser(id);
            return response.status(200).json({ notification: `User ${user.name} ${user.surname} deleted!`});
        } catch (err) {
            console.log("User deletion failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete user" });
        }
    },
}