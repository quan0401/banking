import { Request, Response } from 'express';
import { chatService } from '~services/db/chat.service';
import { IMessageDocument } from '../interfaces/message.interface';
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { sendMessageScheme } from '../schemes/sendMessage.scheme';

export class SendMessage {
  @joiValidation(sendMessageScheme)
  public async send(req: Request, res: Response): Promise<void> {
    // required fields
    const { conversationId, userId, messageType } = req.body;
    // optional fields
    const { messageText, mediaUrl, sentAt, editedAt, deletedAt } = req.body;

    const optionalFields: IMessageDocument = {
      messageText,
      mediaUrl,
      sentAt,
      editedAt,
      deletedAt
    };
    const currentUser = req.currentUser;

    const message = await chatService.sendMessage(conversationId, [currentUser?.id!, userId], messageType, optionalFields);
    res.status(StatusCodes.OK).json({ message: 'Message sent successfully', messageData: message });
  }

  public async connectWithAdmin(req: Request, res: Response): Promise<void> {
    const currentUser = req.currentUser;
    const message = await chatService.connectWithAdmin(currentUser?.id!);
    res.status(StatusCodes.OK).json({ message: 'Connected with admin', messageData: message });
  }
}
