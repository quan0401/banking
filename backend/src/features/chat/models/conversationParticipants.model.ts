import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '~/database';
import { AuthModel } from '~auth/models/auth.model';
import { ConversationModel } from './conversation.model';
import { IConversationParticipantsDocument } from '../interfaces/conversationParticipants.interface';

export const ConversationParticipantsModel: ModelDefined<IConversationParticipantsDocument, IConversationParticipantsDocument> =
  sequelize.define(
    'conversation_participants',
    {
      conversationId: {
        type: DataTypes.UUID,
        references: {
          model: ConversationModel,
          key: 'id'
        },
        allowNull: false,
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
      role: {
        type: DataTypes.ENUM('member', 'admin'),
        defaultValue: 'member'
      },
      notificationsEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      addedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
      },
      addedBy: {
        type: DataTypes.UUID,
        references: {
          model: AuthModel,
          key: 'id'
        },
        allowNull: true
      }
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ['conversationId']
        },
        {
          fields: ['userId']
        }
      ]
    }
  );

ConversationParticipantsModel.sync({});
