const { Segments, Joi } = require('celebrate');

let validateDistance = new Object;

validateDistance.calculate = {
    [Segments.BODY]: Joi.object().keys({
        userPosition: Joi.object().keys({
            lat: Joi.number().required(),
            long: Joi.number().required()
        }).required(),
        bar_id: Joi.string().required(),
    })
};

module.exports = validateDistance;