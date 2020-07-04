const { Segments, Joi } = require("celebrate");

let validadeAvaliation = new Object();

validadeAvaliation.create = {
  [Segments.BODY]: Joi.object().keys({
    bars_id: Joi.string().required(),
    bar_space: Joi.number().integer().min(0).max(5).optional(),
    bar_service: Joi.number().integer().min(0).max(5).optional(),
    bar_cleaning: Joi.number().integer().min(0).max(5).optional(),
    bar_foods: Joi.number().integer().min(0).max(5).optional(),
    bar_cleaning: Joi.number().integer().min(0).max(5).optional(),
    bar_drinks: Joi.number().integer().min(0).max(5).optional(),
    bar_price: Joi.number().integer().min(0).max(5).optional(),
  }),
};

validadeAvaliation.index = {
  [Segments.PARAMS]: Joi.object().keys({
    bar_id: Joi.string().required(),
  }),
};

validadeAvaliation.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    bars_id: Joi.string().optional(),
    bar_space: Joi.number().integer().min(0).max(5).optional(),
    bar_service: Joi.number().integer().min(0).max(5).optional(),
    bar_cleaning: Joi.number().integer().min(0).max(5).optional(),
    bar_foods: Joi.number().integer().min(0).max(5).optional(),
    bar_cleaning: Joi.number().integer().min(0).max(5).optional(),
    bar_drinks: Joi.number().integer().min(0).max(5).optional(),
    bar_price: Joi.number().integer().min(0).max(5).optional(),
  }),
};

validadeAvaliation.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = validadeAvaliation;
