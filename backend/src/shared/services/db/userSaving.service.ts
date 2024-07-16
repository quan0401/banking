import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Model } from 'sequelize';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { SavingPlanModel } from '~savingPlan/models/savingPlan.model';
import { IUserSavingDocument } from '~userSaving/interfaces/userSaving.interface';
import { UserSavingModel } from '~userSaving/models/userSaving.model';

class UserSavingService {
  // create (private)
  // topUpMoney
  // withdrawMoney
  // isValidAction (private)
  public async topUpMoney(userId: string, savingPlanId: string, amount: number): Promise<IUserSavingDocument> {
    let currentUserSaving: Model | null = await UserSavingModel.findOne({
      where: {
        userId,
        savingPlanId
      }
    });
    const savingPlan: Model | null = await SavingPlanModel.findByPk(savingPlanId);
    if (!savingPlan) {
      throw new BadRequestError('SavingPlan not Found', 'UserSavingService topUpMoney method');
    }
    //  Create user saving if not exist (topUp for the first time)
    if (!currentUserSaving) {
      const userSavingDoc: IUserSavingDocument = {
        userId,
        savingPlanId,
        currency: savingPlan?.dataValues.currency
      };
      currentUserSaving = (await this.create(userSavingDoc)) as Model;
    }

    await this.isValidAction(currentUserSaving.dataValues, savingPlan.dataValues, amount, 'topUp');

    const total = amount + currentUserSaving.dataValues.totalAmount;
    const updated = await currentUserSaving.update({
      totalAmount: total
    });

    return updated.dataValues;
  }

  public async withdrawMoney(
    userId: string,
    savingPlanId: string,
    amount: number,
    flexibleWithdraw: boolean = false
  ): Promise<IUserSavingDocument> {
    let currentUserSaving: Model | null = await UserSavingModel.findOne({
      where: {
        userId,
        savingPlanId
      }
    });
    const savingPlan: Model | null = await SavingPlanModel.findByPk(savingPlanId);
    // check if savingPlan and userSaving exists
    if (!savingPlan) {
      throw new BadRequestError('SavingPlan not Found', 'UserSavingService withdrawMoney method');
    }
    if (!currentUserSaving) {
      throw new BadRequestError('UserSaving not Found', 'UserSavingService withdrawMoney method');
    }

    await this.isValidAction(currentUserSaving.dataValues, savingPlan.dataValues, amount, 'withdraw', flexibleWithdraw);

    const updated = await currentUserSaving.update({
      totalAmount: currentUserSaving.dataValues.totalAmount - amount
    });

    return updated.dataValues;
  }

  private async create(plan: IUserSavingDocument): Promise<Model> {
    const createdPlan: Model = await UserSavingModel.create(plan);
    return createdPlan;
  }

  private async isValidAction(
    currentUserSaving: Required<IUserSavingDocument>,
    savingPlan: Required<ISavingPlanDocument>,
    amount: number,
    action: 'withdraw' | 'topUp',
    flexibleWithdraw: boolean = false
  ): Promise<boolean> {
    let newTotalAmount: number;

    // savingPlan no longer active
    if (savingPlan.isActive === 0) {
      throw new BadRequestError('SavingPlan is no longer active.', 'UserSavingService');
    }
    // check if the topUp currency match the savingPlan
    if (savingPlan.currency !== currentUserSaving.currency) {
      throw new BadRequestError('SavingPlan currency and UserSaving must be the same.', 'UserSavingService');
    }
    // check if the transaction satisfies minimumEachTransaction
    if (!flexibleWithdraw && amount < savingPlan.minimumEachTransaction) {
      throw new BadRequestError(
        `Transaction amount must be greater than saving plan minimumEachTransaction (${savingPlan.minimumEachTransaction} ${savingPlan.currency})`,
        'UserSavingService'
      );
    }

    switch (action) {
      case 'topUp':
        newTotalAmount = currentUserSaving.totalAmount + amount;
        if (newTotalAmount > savingPlan.maximumBalance) {
          // return false;
          throw new BadRequestError('UserSaving exceeds the maximum of the saving plan.', 'UserSavingService');
        }
        break;

      case 'withdraw':
        newTotalAmount = currentUserSaving.totalAmount - amount;
        if (newTotalAmount < 0) {
          throw new BadRequestError("UserSaving can't be negative.", 'UserSavingService');
        }
        break;
    }
    return true;
  }

  public async getUserSaving(userId: string, savingPlanId: string): Promise<IUserSavingDocument | undefined> {
    const userSaving: Model | null = await UserSavingModel.findOne({
      where: {
        userId,
        savingPlanId
      }
    });
    return userSaving?.dataValues;
  }

  public async getUserSavingByUserId(userId: string): Promise<IUserSavingDocument[]> {
    const userSaving: Model[] = await UserSavingModel.findAll({
      where: {
        userId
      }
    });
    return userSaving.map((saving) => saving.dataValues);
  }
}
export const userSavingService: UserSavingService = new UserSavingService();
