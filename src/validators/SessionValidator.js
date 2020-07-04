const { Segments, Joi } = require('celebrate');

let validateSession = new Object;

validateSession.create = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })
};

module.exports = validateSession;