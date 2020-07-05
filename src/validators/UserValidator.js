const { Segments, Joi } = require('celebrate');

let validateUser = new Object;

/* table.string('id').primary().notNullable();
table.string('payment_cards_id').references('id').inTable('payment_cards');
table.string('firebase_id').notNullable();
table.string('name').notNullable();
table.string('surname').notNullable();
table.string('email').notNullable();
table.date('birthdate').notNullable();
table.timestamp('created_at').defaultTo(knex.fn.now()); */

validateUser.create = {
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().required(),
        birthdate: Joi.date().required(),
    })
};

validateUser.update = {
    [Segments.BODY]: Joi.object().keys({
        payment_cards_id: Joi.string().optional(),
        name: Joi.string().optional(),
        surname: Joi.string().optional(),
        email: Joi.string().optional(),
        birthdate: Joi.date().optional(),
    })
};

module.exports = validateUser;