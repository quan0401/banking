import Joi, { ObjectSchema } from 'joi';

const savingPlanScheme: ObjectSchema = Joi.object({
  termPeriod: Joi.number().min(0).required().messages({
    'number.base': 'Term period must be a number',
    'number.positive': 'Term period must be a positive number',
    'any.required': 'Term period is a required field'
  }),
  minimumBalance: Joi.number().positive().required().messages({
    'number.base': 'Minimum balance must be a number',
    'number.positive': 'Minimum balance must be a positive number',
    'any.required': 'Minimum balance is a required field'
  }),
  maximumBalance: Joi.number().positive().required().messages({
    'number.base': 'Maximum balance must be a number',
    'number.positive': 'Maximum balance must be a positive number',
    'any.required': 'Maximum balance is a required field'
  }),
  minimumEachTransaction: Joi.number().positive().required().messages({
    'number.base': 'Minimum each transaction must be a number',
    'number.positive': 'Minimum each transaction must be a positive number',
    'any.required': 'Minimum each transaction is a required field'
  }),
  maximumEachTransaction: Joi.number().positive().optional().allow(null, '').messages({
    'number.base': 'Maximum each transaction must be a number',
    'number.positive': 'Maximum each transaction must be a positive number',
    'any.required': 'Maximum each transaction is a required field'
  }),
  interestRate: Joi.number().positive().required().messages({
    'number.base': 'Interest rate must be a number',
    'number.positive': 'Interest rate must be a positive number',
    'any.required': 'Interest rate is a required field'
  }),
  interestRateBeforeDueDate: Joi.number().positive().required().messages({
    'number.base': 'interestRateBeforeDueDate rate must be a number',
    'number.positive': 'interestRateBeforeDueDate rate must be a positive number',
    'any.required': 'interestRateBeforeDueDate rate is a required field'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is a required field'
  }),
  title: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is a required field'
  }),
  basicDescription: Joi.string().required().messages({
    'string.base': 'basicDescription must be a string',
    'any.required': 'basicDescription is a required field'
  }),
  isActive: Joi.boolean().valid(1, 0).allow(null).optional().messages({
    'boolean.base': 'isActive must be a boolean',
    'any.only': 'isActive must be either 1 or 0',
    'any.required': 'isActive is a required field'
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date must be a valid date',
    'any.required': 'Start date is a required field'
  }),
  endDate: Joi.date().allow(null).optional().messages({
    'date.base': 'End date must be a valid date or null'
  }),
  currency: Joi.string().required().messages({
    'string.base': 'Currency must be a string',
    'any.required': 'Currency is a required field'
  }),
  image: Joi.string().required().messages({
    'string.base': 'Currency must be a string',
    'any.required': 'Currency is a required field'
  })
});

const updateSavingPlanScheme: ObjectSchema = Joi.object({
  termPeriod: Joi.number().positive().required().messages({
    'number.base': 'Term period must be a number',
    'number.positive': 'Term period must be a positive number',
    'any.required': 'Term period is a required field'
  }),
  minimumBalance: Joi.number().positive().required().messages({
    'number.base': 'Minimum balance must be a number',
    'number.positive': 'Minimum balance must be a positive number',
    'any.required': 'Minimum balance is a required field'
  }),
  maximumBalance: Joi.number().positive().required().messages({
    'number.base': 'Maximum balance must be a number',
    'number.positive': 'Maximum balance must be a positive number',
    'any.required': 'Maximum balance is a required field'
  }),
  minimumEachTransaction: Joi.number().positive().required().messages({
    'number.base': 'Minimum each transaction must be a number',
    'number.positive': 'Minimum each transaction must be a positive number',
    'any.required': 'Minimum each transaction is a required field'
  }),
  maximumEachTransaction: Joi.number().positive().optional().allow(null, '').messages({
    'number.base': 'Maximum each transaction must be a number',
    'number.positive': 'Maximum each transaction must be a positive number',
    'any.required': 'Maximum each transaction is a required field'
  }),
  interestRate: Joi.number().positive().required().messages({
    'number.base': 'Interest rate must be a number',
    'number.positive': 'Interest rate must be a positive number',
    'any.required': 'Interest rate is a required field'
  }),
  interestRateBeforeDueDate: Joi.number().positive().required().messages({
    'number.base': 'interestRateBeforeDueDate rate must be a number',
    'number.positive': 'interestRateBeforeDueDate rate must be a positive number',
    'any.required': 'interestRateBeforeDueDate rate is a required field'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is a required field'
  }),
  title: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'any.required': 'Description is a required field'
  }),
  basicDescription: Joi.string().required().messages({
    'string.base': 'basicDescription must be a string',
    'any.required': 'basicDescription is a required field'
  }),
  isActive: Joi.boolean().valid(1, 0).allow(null).optional().messages({
    'boolean.base': 'isActive must be a boolean',
    'any.only': 'isActive must be either 1 or 0',
    'any.required': 'isActive is a required field'
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date must be a valid date',
    'any.required': 'Start date is a required field'
  }),
  endDate: Joi.date().allow(null).optional().messages({
    'date.base': 'End date must be a valid date or null'
  }),
  currency: Joi.string().required().messages({
    'string.base': 'Currency must be a string',
    'any.required': 'Currency is a required field'
  }),
  image: Joi.string().required().messages({
    'string.base': 'Currency must be a string',
    'any.required': 'Currency is a required field'
  })
});

export { savingPlanScheme, updateSavingPlanScheme };
