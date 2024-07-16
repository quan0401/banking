import { Model, Op } from 'sequelize'; // Import ValidationError from Sequelize
import { ITransactionDocument, ITransactionResult } from '~transaction/interfaces/transaction.interface';
import { TransactionModel } from '~transaction/models/transaction.model';
import { userSavingService } from '~services/db/userSaving.service';
import { SavingPlanModel } from '~savingPlan/models/savingPlan.model';
import { IUserSavingDocument } from '~userSaving/interfaces/userSaving.interface';
import { BankAccountModel } from '~transaction/models/bankAccount.model';
import { BadRequestError } from '@quan0401/ecommerce-shared';
import { sequelize } from '~/database';
import { calculateBaseOnTransactions } from '~global/helpers/calculator.service';

class TransactionService {
  // makePayment
  // withdraw
  // scheduleTransaction
  // cacnelScheduledTransaction
  public async makePayment(transactionDoc: Required<ITransactionDocument>): Promise<ITransactionResult> {
    if (transactionDoc.transactionType !== 1) {
      throw new BadRequestError('TransactionType must be 1 for make payment and 0 for withdraw', 'TransactionService makePayment');
    }
    // const bankAccount: Model | null = await BankAccountModel.findByPk(transactionDoc.bankAccountId);
    // if (bankAccount === null) {
    //   throw new BadRequestError('Bank Account not exists', 'TransactionService makePayment');
    // }
    // const updatedUserSaving: IUserSavingDocument = await userSavingService.topUpMoney(
    //   transactionDoc.userId,
    //   transactionDoc.savingPlanId,
    //   transactionDoc.amount
    // );
    // TODO: make hanlder for isSuccessful
    const createdTransaction: Model = await TransactionModel.create({
      ...transactionDoc,
      isSuccessful: 0
    });
    return {
      transaction: createdTransaction.dataValues
    };
  }
  public async markPaymentStatus(
    userId: string,
    transactionId: string,
    savingPlanId: string,
    status: 1 | 0
  ): Promise<ITransactionResult | undefined> {
    if (status === 1) {
      const transaction: Model<ITransactionDocument> | null = await TransactionModel.findOne({
        where: {
          userId,
          savingPlanId,
          id: transactionId,
          isSuccessful: 0
        }
      });
      if (!transaction) return;
      const updated = await TransactionModel.update(
        {
          isSuccessful: status
        },
        {
          where: {
            userId,
            savingPlanId,
            id: transactionId
          }
        }
      );

      if (updated[0] === 0) return;
      const userSaving: IUserSavingDocument = await userSavingService.topUpMoney(
        userId,
        savingPlanId,
        transaction.dataValues.amount as number
      );
      return { transaction: transaction.dataValues, userSaving };
    }
  }
  public async makePaymentWithMomo(transactionDoc: Required<ITransactionDocument>): Promise<ITransactionResult> {
    if (transactionDoc.transactionType !== 1) {
      throw new BadRequestError('TransactionType must be 1 for make payment and 0 for withdraw', 'TransactionService makePayment');
    }
    const updatedUserSaving: IUserSavingDocument = await userSavingService.topUpMoney(
      transactionDoc.userId,
      transactionDoc.savingPlanId,
      transactionDoc.amount
    );
    // TODO: make hanlder for isSuccessful
    const createdTransaction: Model = await TransactionModel.create({
      ...transactionDoc,
      isSuccessful: 1
    });
    return {
      transaction: createdTransaction.dataValues,
      userSaving: updatedUserSaving
    };
  }
  public async withdraw(transactionDoc: Required<ITransactionDocument>): Promise<ITransactionResult> {
    if (transactionDoc.transactionType !== -1) {
      throw new BadRequestError('TransactionType must be -1 for withdrawal', 'TransactionService makePayment');
    }
    const bankAccount: Model | null = await BankAccountModel.findByPk(transactionDoc.bankAccountId);
    if (bankAccount === null) {
      throw new BadRequestError('Bank Account not exists', 'TransactionService makePayment');
    }
    const updatedUserSaving: IUserSavingDocument = await userSavingService.withdrawMoney(
      transactionDoc.userId,
      transactionDoc.savingPlanId,
      transactionDoc.amount
    );
    // TODO: make hanlder for isSuccessful
    const createdTransaction: Model = await TransactionModel.create({
      ...transactionDoc,
      isSuccessful: 1
    });
    return {
      transaction: createdTransaction.dataValues,
      userSaving: updatedUserSaving
    };
  }
  public async getAllTransactionsOfUser(userId: string): Promise<ITransactionDocument[]> {
    const transactions: ITransactionDocument[] = (
      await TransactionModel.findAll({
        where: {
          userId
        },
        order: [['transactionDate', 'DESC']]
      })
    ).map((tran) => tran.dataValues);
    return transactions;
  }
  public async getTransactionsOfUserBySavingPlan(userId: string, savingPlanId: string): Promise<ITransactionDocument[]> {
    const transactions: ITransactionDocument[] = (
      await TransactionModel.findAll({
        where: {
          userId,
          savingPlanId
        },
        order: [['transactionDate', 'DESC']]
      })
    ).map((tran) => {
      const value = tran.dataValues;
      return value;
    });
    return transactions;
  }
  public async getTransactionsByDate(userId: string, startDate: Date, endDate: Date): Promise<ITransactionDocument[]> {
    // Set startDate to the beginning of the day
    startDate.setHours(0, 0, 0, 0);
    // Set endDate to the end of the day
    endDate.setHours(23, 59, 59, 999);

    const transactions: ITransactionDocument[] = (
      await TransactionModel.findAll({
        where: {
          userId,
          transactionDate: {
            [Op.between]: [startDate, endDate]
          }
        },
        order: [['transactionDate', 'DESC']]
      })
    ).map((tran) => tran.dataValues);
    return transactions;
  }
  public async withDrawByTransactionId(userId: string, transactionId: string): Promise<ITransactionDocument | undefined> {
    // Start a transaction
    const t = await sequelize.transaction();

    try {
      const transaction = await TransactionModel.findOne({
        where: { userId, id: transactionId },
        transaction: t
      });

      if (!transaction) {
        throw new BadRequestError('Transaction not found', 'TransactionService withDrawByTransactionId');
      }

      const {
        hasWithdrawn,
        transactionType,
        isSuccessful,
        userId: txnUserId,
        bankAccountId,
        savingPlanId,
        amount
      } = transaction.dataValues;

      if (hasWithdrawn) {
        throw new BadRequestError('Transaction has been withdrawn', 'TransactionService withDrawByTransactionId');
      } else if (transactionType === -1) {
        throw new BadRequestError('TransactionType must be 1 to be able to withdraw ', 'TransactionService withDrawByTransactionId');
      } else if (isSuccessful === 0) {
        throw new BadRequestError('Transaction is not successful', 'TransactionService withDrawByTransactionId');
      }

      // Correct update syntax
      // await transaction.update({ hasWithdrawn: true }, { transaction: t });

      const createdWithDrawal = await TransactionModel.create(
        {
          userId: txnUserId,
          bankAccountId,
          savingPlanId,
          amount,
          isSuccessful: 1,
          hasWithdrawn: false,
          withDrawFromId: transactionId,
          transactionType: -1,
          transactionDate: new Date()
        },
        { transaction: t }
      );

      await transaction.update({ withDrawId: createdWithDrawal.dataValues.id, hasWithdrawn: true }, { transaction: t });

      // Commit the transaction
      await t.commit();
      await userSavingService.withdrawMoney(userId, savingPlanId as string, parseFloat(`${amount}`));

      return createdWithDrawal.dataValues;
    } catch (error) {
      // Rollback the transaction in case of error
      await t.rollback();
      throw error; // Rethrow the error after rollback
    }
  }
  public async withDrawAmountByTransactionId(
    userId: string,
    transactionId: string,
    withDrawAmount: number
  ): Promise<ITransactionDocument | undefined> {
    // Start a transaction

    const t = await sequelize.transaction();
    try {
      const transaction = await TransactionModel.findOne({
        where: { userId, id: transactionId },
        transaction: t
      });

      if (!transaction) {
        throw new BadRequestError('Transaction not found', 'TransactionService withDrawByTransactionId');
      }
      const savingPlan = await SavingPlanModel.findByPk(transaction.dataValues.savingPlanId);
      if (!savingPlan) {
        throw new BadRequestError('Saving Plan not found', 'TransactionService withDrawByTransactionId');
      }
      const compound = calculateBaseOnTransactions([transaction.dataValues], savingPlan.dataValues);

      const {
        hasWithdrawn,
        transactionType,
        isSuccessful,
        userId: txnUserId,
        bankAccountId,
        savingPlanId,
        amount
      } = transaction.dataValues;

      if (hasWithdrawn) {
        throw new BadRequestError('Transaction has been withdrawn', 'TransactionService withDrawByTransactionId');
      } else if (transactionType === -1) {
        throw new BadRequestError('TransactionType must be 1 to be able to withdraw ', 'TransactionService withDrawByTransactionId');
      } else if (isSuccessful === 0) {
        throw new BadRequestError('Transaction is not successful', 'TransactionService withDrawByTransactionId');
      }

      if (withDrawAmount > compound) {
        throw new BadRequestError(
          'Amount to withdraw is greater than the transaction amount',
          'TransactionService withDrawByTransactionId'
        );
      } else if (withDrawAmount < 0) {
        throw new BadRequestError('Amount to withdraw must be greater than 0', 'TransactionService withDrawByTransactionId');
      }
      const createdWithDrawal = await TransactionModel.create(
        {
          userId: txnUserId,
          bankAccountId,
          savingPlanId,
          amount: withDrawAmount,
          isSuccessful: 1,
          hasWithdrawn: false,
          withDrawFromId: transactionId,
          transactionType: -1,
          transactionDate: new Date()
        },
        { transaction: t }
      );

      if (withDrawAmount === compound) {
        await transaction.update({ withDrawId: createdWithDrawal.dataValues.id, hasWithdrawn: true }, { transaction: t });
      } else if (withDrawAmount < compound) {
        await transaction.update({ withDrawId: createdWithDrawal.dataValues.id, amount: compound - withDrawAmount }, { transaction: t });
      }

      // Commit the transaction
      await userSavingService.withdrawMoney(userId, savingPlanId as string, parseFloat(`${withDrawAmount - (compound - amount!)}`), true);
      await t.commit();
      return createdWithDrawal.dataValues;
    } catch (error) {
      // Rollback the transaction in case of error
      await t.rollback();
      console.log('error', error);
      throw error; // Rethrow the error after rollback
    }
  }

  public async topUpMoreMoneyOnExistingTransaction(amount: number, transactionId: string): Promise<ITransactionDocument | undefined> {
    const transaction: Model<ITransactionDocument> | null = await TransactionModel.findByPk(transactionId);
    if (!transaction) {
      throw new BadRequestError('Transaction not found', 'TransactionService topUpMoreMoneyOnExistingTransaction');
    }
    const savingPlan = await SavingPlanModel.findByPk(transaction.dataValues.savingPlanId);
    if (!savingPlan) {
      throw new BadRequestError('Saving Plan not found', 'TransactionService topUpMoreMoneyOnExistingTransaction');
    }
    if (transaction.dataValues.transactionType === -1) {
      throw new BadRequestError('Topup on transactionType === 1 only', 'TransactionService topUpMoreMoneyOnExistingTransaction');
    }
    const profitPlusMore =
      calculateBaseOnTransactions([transaction.dataValues], savingPlan.dataValues) - transaction.dataValues.amount! + amount;
    const profit = profitPlusMore - amount;
    const originalAmount = transaction.dataValues.amount!;

    const userSaving: IUserSavingDocument = await userSavingService.topUpMoney(
      transaction.dataValues.userId!,
      savingPlan.dataValues.id!,
      profitPlusMore
    );
    const updatedTransaction = await transaction.update({
      amount: profit + originalAmount + amount,
      transactionDate: new Date(),
      updatedAt: new Date()
    });
    return updatedTransaction.dataValues;
  }
}
export const transactionService: TransactionService = new TransactionService();
