const CategoryModel = require("../models/CategoryModel");

module.exports = {
    async create(request, response) {
        try {
            const category = request.body;
            const result = await CategoryModel.createCategory(category);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Category creation failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to create category" });
        }
    },

    async index(request, response) {
        try {
            const result = await CategoryModel.getAllCategories();
            return response.status(200).json(result);
        } catch(err) {
            console.log("Category reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get categories" });
        }
    },

    async getAll(request, response) {
        try {
            const result = await CategoryModel.getAllCategorized();
            return response.status(200).json(result);
        } catch(err) {
            console.log("Category reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get categories" });
        }
    },

    async getOne(request, response) {
        try {
            const { id } = request.params;
            const result = await CategoryModel.getOneCategory(id);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Category reading failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to get one category" });
        }
    },

    async categorise(request, response) {
        try {
            const { id } = request.params;
            const { bars_id, reverse } = request.body;
            let result = new Object;
            if(!reverse){
                result = await CategoryModel.categoriseBar(bars_id, id);
            } else {
                result = await CategoryModel.decategoriseBar(bars_id, id);
            }
            return response.status(200).json(result);
        } catch(err) {
            console.log("Categorization process failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to categorise bar" });
        }
    },

    async delete(request, response){
        try {
            const { id } = request.params;
            const result = await CategoryModel.deleteCategory(id);
            return response.status(200).json(result);
        } catch(err) {
            console.log("Category deletion failed: " + err);
            return response.status(500).json({ notification: "Internal server error while trying to delete category" });
        }
    }
}