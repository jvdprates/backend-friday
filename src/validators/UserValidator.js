const { Segments, Joi } = require('celebrate');

let validateUser = new Object;

validateUser.create = {
    [Segments.BODY]: Joi.object().keys({
        firebase_id: Joi.string().required(),
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().required(),
        birthdate: Joi.date().required(),
    })
   /*  table.string('firebase_id').notNullable();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('email').notNullable();
    table.date('birthdate').notNullable(); */
};

validateUser.readOne = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
};

validateUser.update = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        firebase_id: Joi.string().optional(),
        name: Joi.string().optional(),
        surname: Joi.string().optional(),
        email: Joi.string().optional(),
        birthdate: Joi.date().optional(),
    })
};

validateUser.delete = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
};

module.exports = validateUser;