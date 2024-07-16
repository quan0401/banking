import Joi from 'joi';

const bankAccountScheme = Joi.object({
  accountHolder: Joi.string().required().messages({
    'string.base': 'Account holder must be a string',
    'string.required': 'Account holder is required'
  }),
  bankName: Joi.string().required().messages({
    'string.base': 'Bank name must be a string',
    'string.required': 'Bank name is required'
  }),
  accountNumber: Joi.string().required().messages({
    'string.base': 'Account number must be a string',
    'string.required': 'Account number is required'
  }),
  ownerAddress: Joi.string().allow('').optional().messages({
    'string.base': 'Owner address must be a string',
    'string.empty': 'Owner address cannot be empty'
  }),
  ownerContact: Joi.string().allow('').optional().messages({
    'string.base': 'Owner contact must be a string',
    'string.empty': 'Owner contact cannot be empty'
  }),
  accountType: Joi.string().allow('').optional().messages({
    'string.base': 'Account type must be a string',
    'string.empty': 'Account type cannot be empty'
  }),
  currency: Joi.string().valid('VND').optional().messages({
    'string.base': 'Currency must be a string',
    'any.only': 'Currency must be "VND"'
  }),
  branch: Joi.string().allow('').optional().messages({
    'string.base': 'Branch must be a string',
    'string.empty': 'Branch cannot be empty'
  }),
  status: Joi.string().allow('').optional().messages({
    'string.base': 'Status must be a string',
    'string.empty': 'Status cannot be empty'
  })
});

export { bankAccountScheme };
