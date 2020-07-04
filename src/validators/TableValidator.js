const { Segments, Joi } = require("celebrate");

let validadeTable = new Object();

validadeTable.create = {
  [Segments.BODY]: Joi.object().keys({
    table_number: Joi.number().integer().min(0).required(),
  }),
};

validadeTable.index = {
  [Segments.PARAMS]: Joi.object().keys({
    bar_id: Joi.string().required(),
  }),
};

validadeTable.update = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    table_number: Joi.number().integer().min(0).optional(),
  }),
};

validadeTable.delete = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = validadeTable;
