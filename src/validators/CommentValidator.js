const { Segments, Joi } = require("celebrate");

let validateComment = new Object();

/* .createTable(('comments'), function (table) {
    table.increments();
    table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
    table.string('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.string('comment').notNullable();
}) */

validateComment.create = {
  [Segments.BODY]: Joi.object().keys({
    bars_id: Joi.string().required(),
    users_id: Joi.string().required(),
    comment: Joi.string().required(),
  }),
};

validateComment.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    comment: Joi.string().required(),
  }),
};

validateComment.index = {
  [Segments.PARAMS]: Joi.object().keys({
    bar_id: Joi.string().required(),
  }),
};

validateComment.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = validateComment;
