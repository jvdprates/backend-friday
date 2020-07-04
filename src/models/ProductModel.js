const connection = require("../database/connection");

module.exports = {
  async create(product) {
    console.log("Product: " + product.name);
    const result = await connection("products").insert(product);
    console.log("Create Product!");
    return result;
  },

  async index(bar_id) {
    console.log("Finding products from: " + bar_id);
    const result = await connection("products")
      .where({ bars_id: bar_id })
      .select("*");
    return result;
  },

  async indexOne(id) {
    console.log("Finding product: " + id);
    const result = await connection("products")
      .where({ id })
      .select("*")
      .first();

    return result;
  },

  async update(product_id, bar_id, product) {
    console.log("Updating product: " + product_id);
    const result = await connection("products")
      .where({ id: product_id, bars_id: bar_id })
      .update(product);
    console.log("product Updated!");
    return result;
  },

  async delete(product_id, bar_id) {
    console.log("Deleting product: " + product_id);
    const result = await connection("products")
      .where({ id: product_id, bars_id: bar_id })
      .delete();
    console.log("product Deleted!");
    return result;
  },
};
