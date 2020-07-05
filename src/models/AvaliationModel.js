const connection = require("../database/connection");

module.exports = {
  async create(avaliation) {
    console.log("Creating Avaliation");
    const result = await connection("avaliations").insert(avaliation);
    console.log("Avaliation Created!");
    return result;
  },

  async index(bar_id) {

    const result = await connection("avaliations")
      .avg("bar_space AS bar_space")
      .avg("bar_service AS bar_service")
      .avg("bar_service AS bar_service")
      .avg("bar_cleaning AS bar_cleaning")
      .avg("bar_foods AS bar_foods")
      .avg("bar_drinks AS bar_drinks")
      .avg("bar_price AS bar_price")
      .where({ bars_id: bar_id })
      .first();

    return result;
  },

  async update(avaliation_id, user_id, avaliation) {
    console.log("Updating avaliation: " + avaliation_id + " from: " + user_id);
    const result = await connection("avaliations")
      .where({ id: avaliation_id, users_id: user_id })
      .update(avaliation);
    console.log("avaliation Updated!");
    return result;
  },

  async delete(avaliation_id, user_id) {
    console.log("Deleting avaliation: " + avaliation_id);
    const result = await connection("avaliations")
      .where({ id: avaliation_id, users_id: user_id })
      .delete();
    console.log("avaliation Deleted!");
    return result;
  },
};
