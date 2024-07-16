import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { savingPlanService } from '~services/db/savingPlan.service';

export class DeleteSavingPlan {
  public async byId(req: Request, res: Response): Promise<void> {
    await savingPlanService.deleteSavingPlanById(req.params.planId);
    res.status(StatusCodes.CREATED).json({ message: 'Delete Saving Plan successfully' });
  }
}
