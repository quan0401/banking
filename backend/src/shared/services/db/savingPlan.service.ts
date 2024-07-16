import { Model } from 'sequelize';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { SavingPlanModel } from '~savingPlan/models/savingPlan.model';

class SavingPlanService {
  public async create(plan: ISavingPlanDocument): Promise<ISavingPlanDocument> {
    const createdPlan: Model = await SavingPlanModel.create(plan);
    return createdPlan.dataValues;
  }
  public async getAllSavingPlan(isActive: Required<ISavingPlanDocument>['isActive']): Promise<ISavingPlanDocument[]> {
    const savingPlans: ISavingPlanDocument[] = (
      await SavingPlanModel.findAll({
        where: {
          isActive
        }
      })
    ).map((model) => model.dataValues);
    return savingPlans;
  }
  public async getSavingPlanById(planId: Required<ISavingPlanDocument>['id']): Promise<ISavingPlanDocument | undefined> {
    const savingPlan: Model | null = await SavingPlanModel.findOne({
      where: {
        id: planId
      }
    });
    return savingPlan?.dataValues;
  }
  public async updateSavingPlanById(
    planId: Required<ISavingPlanDocument>['id'],
    planDoc: ISavingPlanDocument
  ): Promise<ISavingPlanDocument | undefined> {
    const savingPlan: Model | null = await SavingPlanModel.findByPk(planId);

    if (!savingPlan) {
      return;
    }

    const updatedSavingPlan: Model = await savingPlan.update(planDoc);

    return updatedSavingPlan?.dataValues;
  }
  public async deleteSavingPlanById(planId: Required<ISavingPlanDocument>['id']): Promise<void> {
    await SavingPlanModel.destroy({
      where: {
        id: planId
      }
    });
  }
}
export const savingPlanService: SavingPlanService = new SavingPlanService();
