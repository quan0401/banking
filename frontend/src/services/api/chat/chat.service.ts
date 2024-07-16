import { IMessageDocument } from "@interfaces/features/chat.interface";
import axios from "@services/axios";

class ChatService {
  async sendMessage(body: IMessageDocument) {
    const response = await axios.post(`/chat/send-message`, body);
    return response;
  }
  async connectWithAdmin() {
    const response = await axios.post("/chat/connect-with-admin");
    return response;
  }
  async getMessagesByConversationId(conversationId: string) {
    const response = await axios.get(`/chat/get-messages/${conversationId}`);
    return response;
  }
  async getConversationsOfUser(userId: string) {
    const response = await axios.get(`/chat/get-conversations/${userId}`);
    return response;
  }
  async getAllParticipantsOfConversation(conversationId: string) {
    const response = await axios.get(
      `/chat/get-participants/${conversationId}`
    );
    return response;
  }
}

export const chatService = new ChatService();

// /chat/get-conversations/:userId
// /chat/get-messages/:conversationId
// /chat/send-message
