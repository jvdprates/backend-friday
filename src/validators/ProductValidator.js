const { Segments, Joi } = require("celebrate");

let validadeProduct = new Object();

validadeProduct.create = {
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().required(),
    image_id: Joi.string().optional(),
    name: Joi.string().required(),
    category: Joi.string().allow("drink", "desert", "portions").required(),
  }),
};

validadeProduct.index = {
  [Segments.PARAMS]: Joi.object().keys({
    bar_id: Joi.string().required(),
  }),
};

validadeProduct.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    price: Joi.number().min(0).optional(),
    description: Joi.string().optional(),
    image_id: Joi.string().optional(),
    name: Joi.string().optional(),
    category: Joi.string().allow("drink", "desert", "portions").optional(),
  }),
};

validadeProduct.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = validadeProduct;
