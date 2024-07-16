import { sequelize } from '~/database';
import { ConversationModel } from './conversation.model';
import { ConversationParticipantsModel } from './conversationParticipants.model';
import { MessageModel } from './message.model';
import { MessageStatus } from './messageStatus.model';
import { AuthModel } from '~auth/models/auth.model';

export const initializeAssociations = () => {
  // One-to-Many: Conversation has many Messages
  ConversationModel.hasMany(MessageModel, {
    foreignKey: 'conversationId',
    as: 'messages'
  });
  MessageModel.belongsTo(ConversationModel, {
    foreignKey: 'conversationId',
    as: 'conversation'
  });

  // Many-to-Many: Conversation has many Participants (Users) through ConversationParticipants
  ConversationModel.belongsToMany(AuthModel, {
    through: ConversationParticipantsModel,
    foreignKey: 'conversationId',
    otherKey: 'userId',
    as: 'participants'
  });
  AuthModel.belongsToMany(ConversationModel, {
    through: ConversationParticipantsModel,
    foreignKey: 'userId',
    otherKey: 'conversationId',
    as: 'conversations'
  });

  // One-to-Many: User has many Messages
  AuthModel.hasMany(MessageModel, {
    foreignKey: 'userId',
    as: 'messages'
  });
  MessageModel.belongsTo(AuthModel, {
    foreignKey: 'userId',
    as: 'user'
  });

  // Many-to-Many: Message has many statuses (Users) through MessageStatus
  MessageModel.belongsToMany(AuthModel, {
    through: MessageStatus,
    foreignKey: 'messageId',
    otherKey: 'userId',
    as: 'statuses'
  });
  AuthModel.belongsToMany(MessageModel, {
    through: MessageStatus,
    foreignKey: 'userId',
    otherKey: 'messageId',
    as: 'messageStatuses'
  });

  // Additional One-to-Many for ConversationParticipants if necessary
  ConversationModel.hasMany(ConversationParticipantsModel, {
    foreignKey: 'conversationId',
    as: 'participantsDetails'
  });
  ConversationParticipantsModel.belongsTo(ConversationModel, {
    foreignKey: 'conversationId',
    as: 'conversation'
  });

  AuthModel.hasMany(ConversationParticipantsModel, {
    foreignKey: 'userId',
    as: 'participantDetails'
  });
  ConversationParticipantsModel.belongsTo(AuthModel, {
    foreignKey: 'userId',
    as: 'user'
  });
  sequelize
    .sync({
      // alter: true
    })
    .then(() => {
      // console.log('Database & tables created!');
    });
};
