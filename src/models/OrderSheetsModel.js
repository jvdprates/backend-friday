const connection = require("../database/connection");

module.exports = {
  async createOrderSheets(order_sheets) {
    console.log("Creating order_sheets...");
    await connection("order_sheets").insert(order_sheets);
    console.log("OrderSheets Created!");
    return order_sheets.id;
  },

  async getAllOrderSheets(bar_id) {
    console.log("Getting all order_sheets...");
    const tables = await connection("tables as t")
      .where("t.bars_id", "=", bar_id)
      .select("*");
    console.log("Got tables:" + tables);
    let tables_id = [];
    tables.forEach((element) => {
      tables_id.push(element.id);
    });
    const result = await connection("order_sheets as os")
      .whereIn("os.tables_id", tables_id)
      .select("*");
    return result;
  },

  async getOrderSheets(user_id) {
    console.log("Getting user order_sheets...");
    const result = await connection("order_sheets as os")
      .where("os.user_id", "=", user_id)
      .select("*");
    return result;
  },

  async indexPeople(bar_id) {
    console.log("Getting indexPeople from:", bar_id);
    const result = await connection("order_sheets as os")
      .join("tables as t", "os.tables_id", "t.id")
      .where({
        "t.bars_id": bar_id,
        "os.paid": false,
        "os.checking_out": false,
        "os.approved": true,
      })
      .sum("os.guests AS guests")
      .first();
    return result;
  },

  async updateOrderSheets(order_sheets_id, order_sheets) {
    console.log("Updating order_sheets...");
    const result = await connection("order_sheets")
      .where("id", "=", order_sheets_id)
      .update(order_sheets);
    console.log("OrderSheets Updated!");
    return result;
  },

  async deleteOrderSheets(order_sheets_id) {
    console.log("Deleting order_sheets...");
    const result = await connection("order_sheets")
      .where("id", "=", order_sheets_id)
      .delete();
    console.log("OrderSheets Deleted!");
    return result;
  },
};
