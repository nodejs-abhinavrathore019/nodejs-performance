import Joi from 'joi';

const getCatsListSchema = Joi.object({
  limit: Joi.number().optional(),
  reqNum: Joi.number().optional(),
  page: Joi.number().optional(),
  debug: Joi.boolean().optional(),
});

const getCatByIdSchema = Joi.object({
  id: Joi.string().required(),
  debug: Joi.boolean(),
});

export {
  getCatsListSchema,
  getCatByIdSchema,
};
