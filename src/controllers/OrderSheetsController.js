const OrderSheetsModel = require("../models/OrderSheetsModel");

module.exports = {
  async create(request, response) {
    try {
      const { id } = request.session; //SESSAO
      let order_sheets = request.body;
      order_sheets.user_id = id;

      const result = await OrderSheetsModel.createOrderSheets(order_sheets);
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet creation failed: " + err);
      return response.status(500).json({
        notification:
          "Internal server error while trying to create order_sheet",
      });
    }
  },
  async getById(request, response) {
    try {
      const id = request.params.id;
      const result = await OrderSheetsModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get order_sheets",
      });
    }
  },

  async index(request, response) {
    try {
      const bar_id = request.session.id; //SESSAO
      const result = await OrderSheetsModel.getAllOrderSheets(bar_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get order_sheets",
      });
    }
  },

  async indexPeople(request, response) {
    try {
      const { bar_id } = request.params;
      const result = await OrderSheetsModel.indexPeople(bar_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get order_sheets",
      });
    }
  },

  async getByUser(request, response) {
    try {
      const { user_id } = request.params;
      const result = await OrderSheetsModel.getOrderSheets(user_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get order_sheets",
      });
    }
  },

  async update(request, response) {
    try {
      const order_sheet_id = request.params.id;
      const order_sheet = request.body;
      const result = await OrderSheetsModel.updateOrderSheets(
        order_sheet_id,
        order_sheet
      );
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet updating failed: " + err);
      return response.status(500).json({
        notification:
          "Internal server error while trying to update order_sheet",
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const result = await OrderSheetsModel.deleteOrderSheets(id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("OrderSheet deletion failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete OrderSheet",
      });
    }
  },
};
