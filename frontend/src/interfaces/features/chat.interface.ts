export interface IMessageDocument {
  id?: string;
  conversationId?: string;
  userId?: string;
  messageText?: string; // Optional because allowNull is true
  messageType?: "text" | "image" | "video" | "file" | "link" | "audio";
  mediaUrl?: string; // Optional because allowNull is true
  status?: "sent" | "delivered" | "read" | "deleted";
  sentAt?: Date; // Optional because it has a default value
  editedAt?: Date; // Optional because allowNull is true
  deletedAt?: Date; // Optional because allowNull is true
}
