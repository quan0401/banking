export interface IConversationParticipantsDocument {
  id?: string; // Optional because it's auto-incremented
  conversationId: string;
  userId: string;
  role: 'member' | 'admin';
  notificationsEnabled?: boolean; // Optional because it has a default value
  addedAt?: Date; // Optional because it has a default value
  addedBy?: string; // Optional because allowNull is true
}
