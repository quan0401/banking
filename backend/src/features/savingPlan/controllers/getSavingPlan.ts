import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { savingPlanService } from '~services/db/savingPlan.service';

export class GetSavingPlan {
  public async getById(req: Request, res: Response): Promise<void> {
    const savingPlan: ISavingPlanDocument | undefined = await savingPlanService.getSavingPlanById(req.params.planId);
    if (savingPlan === undefined) {
      throw new BadRequestError('Saving Plan not found', 'GetSavingPlan');
    }
    res.status(StatusCodes.CREATED).json({ message: 'Get Saving Plan successfully', savingPlan });
  }

  public async all(req: Request, res: Response): Promise<void> {
    const savingPlans: ISavingPlanDocument[] = await savingPlanService.getAllSavingPlan(1);
    res.status(StatusCodes.CREATED).json({ message: 'Get Saving Plans successfully', savingPlans });
  }
}
