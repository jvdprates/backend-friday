const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    try {
      const { id } = request.session; //SESSAO
      order = request.body;

      order.users_id = id;

      //Get productPrice
      const product = await ProductModel.indexOne(order.products_id);

      if(!product || product === null)
        return response.status(400).json({notification: "Invalid product", product: "a"})
      order.price = product.price;
      order.status = "waiting";

      const result = await OrderModel.create(order);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Order creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create Order",
      });
    }
  },

  async indexBar(request, response) {
    try {
      const { bar_id } = request.params;
      const result = await OrderModel.indexBar(bar_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Order reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get orders",
      });
    }
  },

  async indexSheet(request, response) {
    try {
      const { order_sheet_id } = request.params;
      const result = await OrderModel.indexSheet(order_sheet_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Order reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get orders",
      });
    }
  },

  async update(request, response) {
    try {
      const { id: user_id } = request.session; //SESSAO
      const { id } = request.params;
      const order = request.body;
      const result = await OrderModel.update(id, user_id, order);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Order reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get orders",
      });
    }
  },

  async delete(request, response) {
    try {
      const { id: user_id } = request.session; //SESSAO
      const { id } = request.params;

      const result = await OrderModel.delete(id, user_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Order deletion failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete Order",
      });
    }
  },
};
