const UserModel = require('../models/UserModel');
const FirebaseModel = require('../models/FirebaseModel');
const jwt = require('jsonwebtoken');

module.exports = {
    async signin(request, response) {
      try {
        const { email, password } = request.body;
        let firebaseUid;
  
        try {
          firebaseUid = await FirebaseModel.login(email, password);
        } catch (error) {
          return response.status(400).json({ message: 'Invalid credentials' });
        }
        const user = await UserModel.getUserByFirebaseUid(firebaseUid);
  
        const accessToken = jwt.sign({ type: 'user', id: user.id }, process.env.ACCESS_TOKEN_SECRET);
        return response.status(200).json({ user, accessToken });
  
      } catch (error) {
        return response.status(500).json({ message: 'Error while trying to validate credentials' })
      }
    },
  }