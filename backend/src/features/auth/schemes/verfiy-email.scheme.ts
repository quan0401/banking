import Joi, { ObjectSchema } from 'joi';

const verifyEmailScheme: ObjectSchema = Joi.object().keys({
  token: Joi.string().required().messages({
    'string.base': 'Token must be of type string',
    'string.token': 'Invalid token',
    'string.empty': 'Token is a required field'
  })
});

export { verifyEmailScheme };
