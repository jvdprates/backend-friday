const connection = require("../database/connection");

module.exports = {
  async getCredentials() {
    const response = await connection("credentials").select("*").first();
    return response;
  },

  async updateCredentials(credentials) {
    const token = await connection("credentials").first();

    if (!token) createCredentials(credentials);

    const response = await connection("credentials")
      .first()
      .update(credentials);

    return response;
  },

  createCredentials: createCredentials,
};

async function createCredentials(credentials) {
  const response = await connection("credentials").insert(credentials);
  resolve(response);
}
