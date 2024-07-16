import { Model } from 'sequelize'; // Import ValidationError from Sequelize
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { IBankAccountDocument } from '~transaction/interfaces/bankAccount.interface';
import { BankAccountModel } from '~transaction/models/bankAccount.model';

class BankService {
  // getAllUserBankAccount
  // getBankAccountById
  // deleteBankAccountById
  // deleteAllBankAccountsOfUser
  // updateBankAccount
  public async add(data: IBankAccountDocument): Promise<IBankAccountDocument> {
    const created: Model = await BankAccountModel.create(data);
    return created.dataValues;
  }
  public async getAllUserBankAccount(userId: Required<IAuthDocument>['id']): Promise<IBankAccountDocument[]> {
    const accounts: IBankAccountDocument[] = (
      await BankAccountModel.findAll({
        where: {
          userId
        }
      })
    ).map((account: Model) => account.dataValues);
    return accounts;
  }
  public async getBankAccountById(accountId: string): Promise<IBankAccountDocument | undefined> {
    const account: Model | null = await BankAccountModel.findOne({
      where: {
        id: accountId
      }
    });
    return account?.dataValues;
  }
  public async deleteBankAccountById(accountId: string): Promise<void> {
    const account: Model | null = await BankAccountModel.findByPk(accountId);
    if (account) await account.destroy();
  }
  public async deleteAllBankAccountsOfUser(userId: Required<IAuthDocument>['id']): Promise<void> {
    (
      await BankAccountModel.findAll({
        where: {
          userId
        }
      })
    ).forEach(async (account) => {
      await account.destroy();
    });
  }
  public async updateBankAccount(
    bankAccountId: Required<IBankAccountDocument>['id'],
    data: Required<IBankAccountDocument>
  ): Promise<IBankAccountDocument | undefined> {
    const account: Model | null = await BankAccountModel.findByPk(bankAccountId);
    if (account) await account.update(data);

    return account?.dataValues;
  }
}
export const bankService: BankService = new BankService();
