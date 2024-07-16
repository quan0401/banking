export interface IMessageStatusDocument {
  messageId: string;
  userId: string;
  status: 'sent' | 'delivered' | 'read' | 'deleted';
  updatedAt?: Date; // Optional because it has a default value
}
