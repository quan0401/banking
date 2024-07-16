import { ITransactionDocument } from '~transaction/interfaces/transaction.interface';
import { DataTypes, ModelDefined, Optional } from 'sequelize';
import { sequelize } from '~/database';
import { v4 as uuidv4 } from 'uuid';

type TransactionCreationAttributes = Optional<ITransactionDocument, 'id' | 'createdAt' | 'updatedAt'>;

export const TransactionModel: ModelDefined<ITransactionDocument, TransactionCreationAttributes> = sequelize.define(
  'transactions',
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
    bankAccountId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    savingPlanId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isSuccessful: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    hasWithdrawn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    withDrawId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    withDrawFromId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    scheduledDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    transactionType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, -1]], // 1 for purchase, -1 for withdrawal
          msg: 'TransactionType must be 1 or -1 (1 for purchase, -1 for withdrawal)'
        }
      }
    }
  },
  {
    timestamps: true,
    validate: {
      hasWithdrawnOnlyOnWithdrawal() {
        if (this.transactionType === -1 && !this.withDrawFromId) {
          throw new Error('WithDrawId is required for withdrawal transaction. If hasWithdrawn is true, withDrawId must be present.');
        } else if (this.hasWithdrawn === 1 && !this.withDrawId) {
          throw new Error('If transactionType is 1, withDrawId must be present.');
        }
      }
    }
  }
);
TransactionModel.sync({
  // alter: true // or force: true if you want to drop and recreate the table
})
  .then(() => {
    // console.log('TransactionModel synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing TransactionModel:', error);
  });
