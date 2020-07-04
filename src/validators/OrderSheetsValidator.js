const { Segments, Joi } = require("celebrate");

let validateOrderSheets = new Object();

/* .createTable(('order_sheets'), function (table){
    table.string('id').primary().notNullable();
    table.string('user_id').references('id').inTable('users').onDelete('SET NULL').notNullable();
    table.string('payment_method').notNullable();
    table.boolean('paid').defaultTo(false);
    table.boolean('checking_out').defaultTo(false);
    table.string('tables_id').references('id').inTable('tables').notNullable();
}) */

validateOrderSheets.create = {
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
    payment_method: Joi.string().required(),
    tables_id: Joi.string().required(),
  }),
};

validateOrderSheets.getByUser = {
  [Segments.PARAMS]: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

validateOrderSheets.indexPeople = {
  [Segments.PARAMS]: Joi.object().keys({
    bar_id: Joi.string().required(),
  }),
};

validateOrderSheets.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    paid: Joi.boolean().optional(),
    checking_out: Joi.boolean().optional(),
    payment_method: Joi.string().optional(),
    approved: Joi.boolean().optional(),
    guests: Joi.number().integer().optional(),
  }),
};

validateOrderSheets.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = validateOrderSheets;
