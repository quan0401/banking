import Joi from 'joi';

const sendMessageScheme = Joi.object({
  conversationId: Joi.string().allow('', null).optional().messages({
    'string.base': 'Conversation ID must be a string',
    'string.required': 'Conversation ID is required'
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'string.required': 'User ID is required'
  }),
  messageType: Joi.string().required().messages({
    'string.base': 'Message type must be a string',
    'string.required': 'Message type is required'
  }),
  status: Joi.string().allow('', null).optional().messages({
    'string.base': 'Status must be a string',
    'string.required': 'Status is required'
  }),
  messageText: Joi.string().allow('', null).optional().messages({
    'string.base': 'Message text must be a string',
    'string.empty': 'Message text cannot be empty'
  }),
  mediaUrl: Joi.string().allow('', null).optional().messages({
    'string.base': 'Media URL must be a string',
    'string.empty': 'Media URL cannot be empty'
  }),
  sentAt: Joi.date().optional().messages({
    'date.base': 'Sent at must be a date'
  }),
  editedAt: Joi.date().optional().messages({
    'date.base': 'Edited at must be a date'
  }),
  deletedAt: Joi.date().optional().messages({
    'date.base': 'Deleted at must be a date'
  })
});

export { sendMessageScheme };
