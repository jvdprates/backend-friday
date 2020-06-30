const { Segments, Joi } = require('celebrate');

let validateBar = new Object;

validateBar.create = {
[Segments.BODY]: Joi.object().keys({
        firebase_id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        email: Joi.string().required(),
        image_id: Joi.string().optional(),
        price_range: Joi.number().integer().min(0).max(4).required(),
        phonenumber: Joi.string().required(),
        zipcode: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        neighborhood: Joi.string().required(),
        street: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string().optional(),
    })
    /* table.string('firebase_id').notNullable();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('email').notNullable();
    table.string('image_id');
    table.enu('price_range', [0, 1, 2, 3, 4]).notNullable();
    table.string('zipcode').notNullable();
    table.string('phonenumber');
    table.string('state').notNullable();
    table.string('city').notNullable();
    table.string('neighborhood').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('complement'); */
};

validateBar.readOne = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
};

validateBar.update = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        firebase_id: Joi.string().optional(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        email: Joi.string().optional(),
        image_id: Joi.string().optional(),
        price_range: Joi.number().integer().min(0).max(4).optional(),
        phonenumber: Joi.string().optional(),
        zipcode: Joi.string().optional(),
        state: Joi.string().optional(),
        city: Joi.string().optional(),
        neighborhood: Joi.string().optional(),
        street: Joi.string().optional(),
        number: Joi.string().optional(),
        complement: Joi.string().optional(),
    })
};

validateBar.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
};

module.exports = validateBar;