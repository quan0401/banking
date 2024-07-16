import { Router } from 'express';
import { SendMessage } from '../controllers/sendMessage';
import { GetMessage } from '../controllers/getMessages';
import { verifyUser } from '~global/helpers/auth-middleware';

class ChatRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.get('/chat/get-conversations/:userId', verifyUser, GetMessage.prototype.conversations);
    this.router.get('/chat/get-messages/:conversationId', verifyUser, GetMessage.prototype.getMessages);
    this.router.get('/chat/get-participants/:conversationId', verifyUser, GetMessage.prototype.getAllParticipants);
    this.router.post('/chat/send-message', verifyUser, SendMessage.prototype.send);
    this.router.post('/chat/connect-with-admin', verifyUser, SendMessage.prototype.connectWithAdmin);

    return this.router;
  }
}

export const chatRoutes: ChatRoutes = new ChatRoutes();
