const connection = require("../database/connection");

module.exports = {
  async create(order) {
    console.log("Creating Order");
    const result = await connection("orders").insert(order);
    console.log("Create Order!");
    return result;
  },

  async indexBar(bar_id) {
    console.log("Finding orders from bar: " + bar_id);
    const result = await connection("orders AS o")
      .join("order_sheets AS s", "o.order_sheets_id", "s.id")
      .join("tables AS t", "s.tables_id", "t.id")
      .select(
        "o.*",
        "s.user_id",
        "s.payment_method",
        "s.paid",
        "s.checking_out",
        "s.tables_id",
        "s.checking_out",
        "t.table_number"
      )
      .where({ "t.bars_id": bar_id, "s.paid": false });

    return result;
  },

  async indexSheet(order_sheet_id) {
    console.log("Finding orders from: " + order_sheet_id);
    const result = await connection("orders AS o")
      .join("order_sheets AS s", "o.order_sheets_id", "s.id")
      .select("o.*")
      .where({ "o.order_sheets_id": order_sheet_id });

    return result;
  },

  async update(order_id, order_sheet_id, order) {
    console.log("Updating order: " + order_id + " from: " + order_sheet_id);
    const result = await connection("orders AS o")
      .where({ id: order_id, order_sheets_id: order_sheet_id })
      .update(order);
    console.log("order Updated!");
    return result;
  },

  async delete(order_id, order_sheet_id) {
    console.log("Deleting order: " + order_id);
    const result = await connection("orders")
      .where({ id: order_id, order_sheets_id: order_sheet_id })
      .delete();
    console.log("order Deleted!");
    return result;
  },
};
