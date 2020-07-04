const connection = require("../database/connection");

module.exports = {
    async createCategory(category) {
        console.log("Creating category: " + category.name);
        const result = await connection("categories")
            .insert(category);
        console.log("Category Created!");
        return result;
    },

    async getAllCategorized() {
        console.log("Getting all categorized");
        const result = await connection("bars_categories as bc")
            .join("categories as c", "bc.categories_id", "=", "c.id")
            .join("bars as b", "bc.bars_id", "=", "b.id")
            .select("*");
        return result;
    },

    async getAllCategories() {
        console.log("Getting all categories...");
        const result = await connection("categories")
            .select("*");
        return result;
    },

    async getOneCategory(categories_id) {
        console.log("Getting one category...");
        const result = await connection("categories as c")
            .where("c.id", "=", categories_id)
            .join("bars_categories as bc", "c.id", "=", "bc.categories_id")
            .join("bars as b", "bc.bars_id", "=", "b.id")
            .select("*");
        return result;
    },

    async categoriseBar(bars_id, categories_id) {
        console.log("Categorising...");
        let bars_categories = { bars_id, categories_id };
        const result = await connection("bars_categories")
            .insert(bars_categories);
        console.log("Bar categorized!");
        return result;
    },

    async decategoriseBar(bars_id, categories_id) {
        console.log("Decategorising...");
        const result = await connection("bars_categories")
            .where({ bars_id, categories_id })
            .delete();
        console.log("Bar decategorized!");
        return result;
    },

    async deleteCategory(categories_id) {
        console.log("Deleting category...");
        const result = await connection("categories")
            .where({ id: categories_id })
            .delete();
        console.log("Category Deleted!");
        return result;
    }
}