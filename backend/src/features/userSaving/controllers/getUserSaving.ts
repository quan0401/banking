import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { userSavingService } from '~services/db/userSaving.service';
import { userSavingScheme } from '~userSaving/schemes/userSaving.scheme';
export class GetUserSaving {
  async getBySavingPlanId(request: Request, response: Response) {
    const { userId, savingPlanId } = request.params;
    const userSaving = await userSavingService.getUserSaving(userId, savingPlanId);
    response.status(StatusCodes.OK).json({ message: 'Get user saving successfully', userSaving });
  }

  async getByUserId(request: Request, response: Response) {
    const { userId } = request.params;
    if (!userId) {
      throw new BadRequestError('User ID is required', 'GetUserSaving getByUserId');
    }
    const userSavings = await userSavingService.getUserSavingByUserId(userId);
    response.status(StatusCodes.OK).json({ message: 'Get user saving successfully', userSavings });
  }
}
