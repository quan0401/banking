import Joi, { ObjectSchema } from 'joi';

const signupScheme: ObjectSchema = Joi.object().keys({
  username: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Username must be of type string',
    'string.min': 'Invalid username',
    'string.max': 'Invalid username',
    'string.empty': 'Username is a required field'
  }),
  password: Joi.string().min(4).max(12).required().messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  cccd: Joi.string().required().messages({
    'string.base': 'cccd must be of type string',
    'string.empty': 'cccd is a required field'
  }),
  homeAddress: Joi.string().required().messages({
    'string.base': 'HomeAddress must be of type string',
    'string.empty': 'HomeAddress is a required field'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Invalid email',
    'string.empty': 'Email is a required field'
  }),
  phone: Joi.string().min(10).required().pattern(/^\d+$/).messages({
    'string.base': 'Email must be of type string',
    'string.email': 'Invalid email',
    'string.empty': 'Email is a required field'
  }),
  profilePicture: Joi.string().required().messages({
    'string.base': 'Please add a profile picture',
    'string.email': 'Profile picture is required',
    'string.empty': 'Profile picture is required'
  })
});

export { signupScheme };
