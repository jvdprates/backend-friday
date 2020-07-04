const { Segments, Joi } = require('celebrate');

let validateCard = new Object;

/* .createTable('payment_cards', function (table) {
    table.string('id').primary().notNullable();
    table.string('asas_id').notNullable();
}) */

validateCard.newCard = {
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        asas_id: Joi.string().required(),
    })
};

module.exports = validateCard;