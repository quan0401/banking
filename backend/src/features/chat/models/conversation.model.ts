import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '~/database';
import { IConversationDocument } from '../interfaces/conversation.interface';
import { v4 as uuidv4 } from 'uuid';
import { initializeAssociations } from './chat.associations';

export const ConversationModel: ModelDefined<IConversationDocument, IConversationDocument> = sequelize.define(
  'conversations',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuidv4()
    },
    type: {
      type: DataTypes.ENUM('private', 'group'),
      defaultValue: 'private'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now
    }
  },
  {
    timestamps: true
  }
);

ConversationModel.sync({});
initializeAssociations();
