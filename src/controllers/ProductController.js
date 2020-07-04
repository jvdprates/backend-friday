const ProductsModel = require("../models/ProductModel");

module.exports = {
  async create(request, response) {
    try {
      const { id } = request.session; //SESSAO
      const product = request.body;

      product.bars_id = id;

      const result = await ProductsModel.create(product);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Product creation failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to create Product",
      });
    }
  },

  async index(request, response) {
    try {
      const { bar_id } = request.params;
      const result = await ProductsModel.index(bar_id);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Product reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get products",
      });
    }
  },

  async update(request, response) {
    try {
      const { id: bar_id } = request.session; //SESSAO
      const { id } = request.params;
      const product = request.body;
      const result = await ProductsModel.update(id, bar_id, product);

      return response.status(200).json(result);
    } catch (err) {
      console.log("Product reading failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to get products",
      });
    }
  },

  async delete(request, response) {
    try {
      const { id: bar_id } = request.session; //SESSAO
      const { id } = request.params;

      const result = await ProductsModel.delete(id, bar_id);
      return response.status(200).json(result);
    } catch (err) {
      console.log("Product deletion failed: " + err);
      return response.status(500).json({
        notification: "Internal server error while trying to delete Product",
      });
    }
  },
};
