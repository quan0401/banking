import { BadRequestError } from '@quan0401/ecommerce-shared';
import { sortBy } from 'lodash';
import { Model, QueryTypes } from 'sequelize';
import { sequelize } from '~/database';
import { IConversationDocument } from '~/features/chat/interfaces/conversation.interface';
import { IConversationParticipantsDocument } from '~/features/chat/interfaces/conversationParticipants.interface';
import { IMessageDocument } from '~/features/chat/interfaces/message.interface';
import { ConversationModel } from '~/features/chat/models/conversation.model';
import { ConversationParticipantsModel } from '~/features/chat/models/conversationParticipants.model';
import { MessageModel } from '~/features/chat/models/message.model';
import { AuthModel } from '~auth/models/auth.model';
import { socketIOChatObject } from '~services/socket/chat.socket';

class ChatService {
  public async sendMessage(
    conversationId: string | undefined,
    userIds: string[],
    messageType: 'text' | 'image' | 'video' | 'file' | 'link' | 'audio',
    optionalFields?: IMessageDocument,
    status: 'sent' | 'delivered' | 'read' | 'deleted' = 'sent'
  ): Promise<IMessageDocument> {
    let validConversationId = conversationId;

    // If conversationId is not provided, create a new conversation
    if (!conversationId) {
      const createdConversation = await this.createConversation('private');
      validConversationId = createdConversation.id as string;
      // Add users to the newly created conversation
      for (const userId of userIds) {
        await this.addUserToConversation(validConversationId, userId, 'member');
      }
    } else {
      // Verify the conversationId exists
      const conversationExists = await this.verifyConversationExists(conversationId);
      if (!conversationExists) {
        throw new Error('Conversation does not exist');
      }
    }
    // Proceed with message creation using the validConversationId
    const createdMessage = await this.createMessage(validConversationId as string, userIds[0], messageType, status, optionalFields);
    socketIOChatObject.emit('message received', createdMessage);
    return createdMessage;
  }
  public async connectWithAdmin(userId: string): Promise<IMessageDocument> {
    const admins = await AuthModel.findAll({ where: { isAdmin: 1 } });
    const random = Math.floor(Math.random() * admins.length);
    const admin = admins[random].dataValues;
    if (!admin) {
      throw new BadRequestError('No admin found', 'ChatService connectWithAdmin');
    }

    const conversation = await this.createConversation('private');
    await this.addUserToConversation(conversation.id as string, admin.id!, 'member');
    await this.addUserToConversation(conversation.id as string, userId, 'member');
    const createdMessage = await this.sendMessage(conversation.id as string, [userId, admin.id!], 'text', {
      messageText: 'Connected with admin'
    });
    socketIOChatObject.emit('message received', createdMessage);
    return createdMessage;
  }
  // Method to verify if a conversation exists
  private async verifyConversationExists(conversationId: string): Promise<boolean> {
    const conversation = await ConversationModel.findByPk(conversationId);
    return !!conversation;
  }
  public async getMessagesByConversationId(conversationId: string): Promise<IMessageDocument[]> {
    const messages: Model[] = await MessageModel.findAll({
      where: { conversationId },
      include: [{ model: AuthModel, as: 'user', attributes: ['id', 'username', 'profilePicture'] }],
      order: [['sentAt', 'ASC']]
    });
    return messages.map((message: Model) => {
      return message.dataValues as IMessageDocument;
    });
  }
  public async getAllParticipantsOfConversation(conversationId: string): Promise<IConversationParticipantsDocument[]> {
    const participants: Model[] = await ConversationParticipantsModel.findAll({
      where: { conversationId },
      include: [{ model: AuthModel, as: 'user', attributes: ['username', 'profilePicture'] }]
    });
    return participants.map((participant: Model) => {
      const user = participant.get('user') as Model;
      const data = participant.dataValues;
      delete data.user;
      return { ...data, ...user.dataValues } as IConversationParticipantsDocument;
    });
  }
  public async getConversationsOfUser(userId: string): Promise<IConversationDocument[]> {
    // const conversations: Model[] = await ConversationParticipantsModel.findAll({
    //   where: { userId },
    //   include: [
    //     {
    //       model: ConversationModel,
    //       as: 'conversation',
    //       // attributes: [],
    //       include: [
    //         {
    //           model: MessageModel,
    //           as: 'messages',
    //           limit: 1,
    //           order: [['sentAt', 'DESC']]
    //           // include: [
    //           //   {
    //           //     model: AuthModel,
    //           //     as: 'user'
    //           //   }
    //           // ]
    //         }
    //       ]
    //     }
    //   ]
    // });
    // return conversations.map((conversation: Model) => {
    //   const conversationData = conversation.get('conversation') as Model;
    //   return conversationData.dataValues;
    // });
    const query = `
    SELECT cp.*, u.username as receiverUsername, u.id as receiverId, u.profilePicture, lm.userId as senderId, lm.*
    FROM conversation_participants cp
    INNER JOIN (
      SELECT DISTINCT conversationId
      FROM conversation_participants
      WHERE userId = :userId
    ) userConversations ON cp.conversationId = userConversations.conversationId
    INNER JOIN auths u ON cp.userId = u.id AND cp.userId != :userId
    LEFT JOIN (
      SELECT conversationId, MAX(sentAt) AS lastSentAt
      FROM messages
      GROUP BY conversationId
    ) lastMessage ON cp.conversationId = lastMessage.conversationId
    LEFT JOIN messages lm ON lm.conversationId = lastMessage.conversationId AND lm.sentAt = lastMessage.lastSentAt
`;
    const replacements = { userId };
    const result = await sequelize.query(query, { replacements, type: QueryTypes.SELECT });
    const sortedResult: IConversationDocument[] = sortBy(result, 'sentAt').reverse() as IConversationDocument[];

    return sortedResult;
  }
  public async createConversation(type: 'private' | 'group', optionalFields?: IConversationDocument): Promise<IConversationDocument> {
    const createdConversation: Model = await ConversationModel.create({ type, ...optionalFields });
    return createdConversation.dataValues;
  }
  public async getConversationById(conversationId: string): Promise<IConversationDocument | undefined> {
    const conversation: Model | null = await ConversationModel.findByPk(conversationId);
    return conversation?.dataValues;
  }
  public async addUserToConversation(
    conversationId: string,
    userId: string,
    role: 'member' | 'admin',
    optionalFields?: IConversationParticipantsDocument
  ): Promise<void> {
    await ConversationParticipantsModel.create({ conversationId, userId, role, ...optionalFields });
  }
  public async createMessage(
    conversationId: string,
    userId: string,
    messageType: 'text' | 'image' | 'video' | 'file' | 'link' | 'audio',
    status: 'sent' | 'delivered' | 'read' | 'deleted',
    optionalFields?: IMessageDocument
  ): Promise<IMessageDocument> {
    // Send message
    const message: Model = await MessageModel.create({ conversationId, userId, messageType, status, ...optionalFields });

    // Fetch the message with the user included
    const messageWithUser = await MessageModel.findByPk(message.dataValues.id, {
      include: [{ model: AuthModel, as: 'user', attributes: ['username', 'profilePicture'] }]
    });

    return messageWithUser?.dataValues as IMessageDocument;
  }
}

export const chatService: ChatService = new ChatService();

// Create chat
// Send message
// Get all chats
// Get chat by ID
// Get chat messages
// Get chat participants
// Add chat participant
// Remove chat participant
// Delete chat
// Delete message
// Update message
// Update chat
// Update chat participant
// Update message status
// Update chat status
// Update chat message status
// Get user conversations
// Mute/unmute notifications for a conversation
// Pin/unpin messages
// React to messages
// Forward messages
// Archive conversations
// Leave group conversation
// Transfer group ownership
// Block/unblock users
// Report messages
// Set chat topics
// Search messages by media type
// Download media files
// Read/unread message indicators
// Typing indicators
// Message statistics
// User activity logs
// Set custom chat backgrounds
// Change chat names and avatars
// Create message threads and replies
// Mark messages as important
