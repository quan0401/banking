import { Request, Response } from 'express';
import { chatService } from '~services/db/chat.service';
import { IMessageDocument } from '../interfaces/message.interface';
import { StatusCodes } from 'http-status-codes';

export class GetMessage {
  public async conversations(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const conversations = await chatService.getConversationsOfUser(userId);
    res.status(StatusCodes.OK).json({ message: 'Get conversations of User', conversations });
  }

  public async getMessages(req: Request, res: Response): Promise<void> {
    const { conversationId } = req.params;
    const messages = await chatService.getMessagesByConversationId(conversationId);
    res.status(StatusCodes.OK).json({ message: 'Get messages by conversationId', messages });
  }

  public async getAllParticipants(req: Request, res: Response): Promise<void> {
    const { conversationId } = req.params;
    const participants = await chatService.getAllParticipantsOfConversation(conversationId);
    res.status(StatusCodes.OK).json({ message: 'Get all participants of a conversation', participants });
  }
}
