const { Segments, Joi } = require('celebrate');

let validateBar = new Object;

/* table.string('id').primary().notNullable();
table.string('name').notNullable();
table.string('image_id');
table.string('description');
table.string('phone').notNullable();
table.string('email').notNullable();
table.string('postal_code').notNullable();
table.string('state').notNullable();
table.string('city').notNullable();
table.string('neighborhood').notNullable();
table.string('street').notNullable();
table.integer('number').notNullable();
table.string('complement');
table.float('lat').notNullable();
table.float('long').notNullable();
table.timestamp('created_at').defaultTo(knex.fn.now());
table.string('firebase_id').notNullable(); */

validateBar.create = {
[Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        image_id: Joi.string().optional(),
        description: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        postal_code: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        neighborhood: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.number().integer().required(),
        complement: Joi.string().optional(),
        lat: Joi.number().required(),
        long: Joi.number().required()
    })
};

validateBar.getOne = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
};

validateBar.update = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().optional(),
        image_id: Joi.string().optional(),
        description: Joi.string().optional(),
        phone: Joi.string().optional(),
        email: Joi.string().optional(),
        postal_code: Joi.string().optional(),
        state: Joi.string().optional(),
        city: Joi.string().optional(),
        neighborhood: Joi.string().optional(),
        street: Joi.string().optional(),
        number: Joi.string().optional(),
        complement: Joi.string().optional(),
        lat: Joi.number().optional(),
        long: Joi.number().optional()
    })
};

module.exports = validateBar;