import Joi from 'joi';

const getDogsListSchema = Joi.object({
  limit: Joi.number().optional(),
  page: Joi.number(),
  debug: Joi.boolean(),
});

const getDogByIdSchema = Joi.object({
  id: Joi.string().required(),
  debug: Joi.boolean(),
});

export {
  getDogsListSchema,
  getDogByIdSchema,
};
