const connection = require("../database/connection");
const crypto = require("crypto");
const { trace } = require("console");

module.exports = {
  async create(table) {
    let id;
    let count;
    let isUnique;

    do {
      id = crypto.randomBytes(5).toString("hex");
      isUnique = await connection("tables").where({ id: id }).select("*");

      count++;
    } while (isUnique.length > 0 && count < 10);

    if (count === 10)
      throw new Error("Fatal error while trying to generate table id");

    table.id = id;
    console.log("Table:", table.id, "from:", table.bars_id);
    const result = await connection("tables").insert(table);
    console.log("Create Table!");
    return result;
  },

  async index(bar_id) {
    console.log("Finding tables from: " + bar_id);
    const result = await connection("tables")
      .where({ bars_id: bar_id })
      .select("*");
    return result;
  },

  async update(table_id, bar_id, table) {
    console.log("Updating table: " + table_id);
    const result = await connection("tables")
      .where({ id: table_id, bars_id: bar_id })
      .update(table);
    console.log("table Updated!");
    return result;
  },

  async delete(table_id, bar_id) {
    console.log("Deleting table: " + table_id);
    const result = await connection("tables")
      .where({ id: table_id, bars_id: bar_id })
      .delete();
    console.log("table Deleted!");
    return result;
  },
};
