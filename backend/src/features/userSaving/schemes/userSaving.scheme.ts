import Joi, { ObjectSchema } from 'joi';

const userSavingScheme: ObjectSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID cannot be empty'
  }),
  savingPlanId: Joi.string().required().messages({
    'string.base': 'Saving plan ID must be a string',
    'string.empty': 'Saving plan ID cannot be empty'
  })
});

export { userSavingScheme };
