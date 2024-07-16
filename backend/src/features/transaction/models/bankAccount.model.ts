import { IBankAccountDocument } from '~transaction/interfaces/bankAccount.interface';
import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '~/database';
import { v4 as uuidv4 } from 'uuid';

type IBankAccountCreationAttributes = Optional<IBankAccountDocument, 'id' | 'createdAt' | 'updatedAt'>;

export const BankAccountModel: ModelDefined<IBankAccountDocument, IBankAccountCreationAttributes> = sequelize.define(
  'bankAccounts',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => uuidv4()
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // Bank account holder's name
    accountHolder: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Bank name
    bankName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Bank account number
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Owner information
    ownerAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ownerContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Account type (e.g., savings, checking, momo)
    accountType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Currency of the account
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'VND' // Default currency
    },
    // Branch of the bank associated with the account
    branch: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Account status (active, closed, etc.)
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'active'
    }
    // Additional fields...
  },
  {
    timestamps: true
  }
);

BankAccountModel.sync({});
