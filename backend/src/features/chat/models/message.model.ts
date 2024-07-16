import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '~/database';
import { ConversationModel } from './conversation.model';
import { v4 as uuidv4 } from 'uuid';
import { AuthModel } from '~auth/models/auth.model';
import { IMessageDocument } from '../interfaces/message.interface';

export const MessageModel: ModelDefined<IMessageDocument, IMessageDocument> = sequelize.define(
  'messages',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: true,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    conversationId: {
      type: DataTypes.UUID,
      references: {
        model: ConversationModel,
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: AuthModel,
        key: 'id'
      }
    },
    messageText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    messageType: {
      type: DataTypes.ENUM('text', 'image', 'video', 'file', 'link', 'audio'),
      defaultValue: 'text'
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered', 'read', 'deleted'),
      defaultValue: 'sent'
    },
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
      allowNull: true
    },
    editedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: true
  }
);

MessageModel.sync({});
