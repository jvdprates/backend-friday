const { Segments, Joi } = require('celebrate');

let validateEvent = new Object;

/* .createTable(('events'), function (table) {
    table.increments();
    table.string('bars_id').references('id').inTable('bars').onDelete('CASCADE').notNullable();
    table.string('description'); 
    table.string('img_link');
    table.string('category'); 
}) */

validateEvent.create = {
    [Segments.BODY]: Joi.object().keys({
        bars_id: Joi.string().required(),
        description: Joi.string().optional(),
        img_link: Joi.string().optional(),
        category: Joi.string().optional()
    })
};

validateEvent.getOne = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
};

validateEvent.update = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        description: Joi.string().optional(),
        img_link: Joi.string().optional(),
        category: Joi.string().optional()
    })
};

validateEvent.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
};

module.exports = validateEvent;