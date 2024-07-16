export interface IBankAccountDocument {
  id?: string;
  userId?: string;
  accountHolder?: string;
  bankName?: string;
  accountNumber?: string;
  ownerAddress?: string;
  ownerContact?: string;
  accountType?: string;
  currency?: string;
  branch?: string;
  status?: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
}
