const { Segments, Joi } = require('celebrate');

let validateCategory = new Object;

/* .createTable(('categories'), function (table) {
    table.increments();
    table.string('name').notNullable();
})
.createTable(('bars_categories'), function (table) {
    table.increments();
    table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
    table.integer('categories_id').references('id').inTable('categories').onDelete('CASCADE').notNullable();
}) */

validateCategory.create = {
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        category_name: Joi.string().required()
    })
};

validateCategory.getOne = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
};

validateCategory.categorize = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        bars_id: Joi.string().required(),
        reverse: Joi.boolean().required()
    })
};

validateCategory.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
};

module.exports = validateCategory;