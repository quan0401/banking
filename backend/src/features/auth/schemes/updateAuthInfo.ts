import Joi, { ObjectSchema } from 'joi';
const updateScheme: ObjectSchema = Joi.object().keys({
  username: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Username must be at least 4 characters',
    'string.max': 'Username must be at most 12 characters',
    'string.empty': 'Username is a required field'
  }),
  cccd: Joi.string().required().messages({
    'string.base': 'CCCD must be of type string',
    'string.empty': 'CCCD is a required field'
  }),
  homeAddress: Joi.string().required().messages({
    'string.base': 'Home Address must be of type string',
    'string.empty': 'Home Address is a required field'
  }),
  phone: Joi.string().min(10).required().pattern(/^\d+$/).messages({
    'string.base': 'Phone number must be of type string',
    'string.pattern.base': 'Invalid phone number, only digits are allowed',
    'string.empty': 'Phone number is a required field'
  }),
  profilePicture: Joi.string().optional().allow('', null).messages({
    'string.base': 'Profile picture must be of type string',
    'string.empty': 'Profile picture can be empty'
  })
});

export { updateScheme };
