import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '~/database';
import { AuthModel } from '~auth/models/auth.model';
import { MessageModel } from './message.model';
import { IMessageStatusDocument } from '../interfaces/messageStatus.interface';

export const MessageStatus: ModelDefined<IMessageStatusDocument, IMessageStatusDocument> = sequelize.define(
  'message_status',
  {
    messageId: {
      type: DataTypes.UUID,
      references: {
        model: MessageModel,
        key: 'id'
      },
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: AuthModel,
        key: 'id'
      },
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('sent', 'delivered', 'read', 'deleted'),
      defaultValue: 'sent'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now
    }
  },
  {
    timestamps: true,
    indexes: [
      {
        fields: ['messageId']
      },
      {
        fields: ['userId']
      }
    ]
  }
);

MessageStatus.sync({}).then(() => {
  // console.log('MessageStatus table created successfully');
});
