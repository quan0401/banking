export interface IConversationDocument {
  id?: string; // Optional because it's auto-incremented
  type: 'private' | 'group';
  name?: string; // Optional because allowNull is true
  description?: string; // Optional because allowNull is true
  avatarUrl?: string; // Optional because allowNull is true
  createdAt?: Date; // Optional because it has a default value
  updatedAt?: Date; // Optional because it has a default value
}
