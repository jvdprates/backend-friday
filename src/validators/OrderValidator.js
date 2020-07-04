const { Segments, Joi } = require("celebrate");

let validadeOrder = new Object();

validadeOrder.create = {
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
    products_id: Joi.string().required(),
    order_sheets_id: Joi.string().required(),
    //status: Joi.string().allow("waiting", "praparing", "delivered").optional(),
    amount: Joi.number().integer().min(1).required(),
    // price: Joi.number.min(0).optional(),
  }),
};

validadeOrder.indexBar = {
  [Segments.PARAMS]: Joi.object().keys({
    bar_id: Joi.string().required(),
  }),
};

validadeOrder.indexSheet = {
  [Segments.PARAMS]: Joi.object().keys({
    order_sheet_id: Joi.string().required(),
  }),
};

validadeOrder.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    bars_id: Joi.string().optional(),
    products_id: Joi.string().optional(),
    order_sheets_id: Joi.string().optional(),
    status: Joi.string().allow("waiting", "praparing", "delivered").optional(),
    amount: Joi.number().integer().min(1).optional(),
    price: Joi.number().min(0).optional(),
  }),
};

validadeOrder.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = validadeOrder;
