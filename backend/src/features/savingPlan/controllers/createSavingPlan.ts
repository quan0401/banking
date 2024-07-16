import { BadRequestError, uploads } from '@quan0401/ecommerce-shared';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { ISavingPlanDocument } from '~savingPlan/interfaces/savingPlan.interface';
import { savingPlanScheme } from '~savingPlan/schemes/savingPlan.cheme';
import { savingPlanService } from '~services/db/savingPlan.service';

export class CreateSavingPlan {
  @joiValidation(savingPlanScheme)
  public async create(req: Request, res: Response): Promise<void> {
    const {
      termPeriod,
      minimumBalance,
      maximumBalance,
      minimumEachTransaction,
      maximumEachTransaction,
      interestRate,
      interestRateBeforeDueDate,
      title,
      description,
      basicDescription,
      isActive,
      startDate,
      endDate,
      currency,
      image
    } = req.body;
    // const uploadResult: UploadApiResponse = (await uploads(image, config.CLOUD_FOLDER!)) as UploadApiResponse;
    // if (!uploadResult.public_id) throw new BadRequestError('File upload error', 'SignUp create() method error');
    const savingPlanDocument: ISavingPlanDocument = {
      termPeriod,
      minimumBalance: parseInt(minimumBalance, 10),
      maximumBalance: parseInt(maximumBalance, 10),
      minimumEachTransaction: parseInt(minimumEachTransaction, 10),
      maximumEachTransaction: parseInt(maximumEachTransaction, 10),
      interestRate: parseFloat(interestRate),
      interestRateBeforeDueDate: parseFloat(interestRateBeforeDueDate),
      title,
      description,
      basicDescription,
      isActive: isActive ? (parseInt(isActive, 10) as ISavingPlanDocument['isActive']) : 1,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(startDate) : null,
      currency,
      image
    };
    const savingPlan: ISavingPlanDocument = await savingPlanService.create(savingPlanDocument);
    res.status(StatusCodes.CREATED).json({ message: 'Created Saving Plan successfully', savingPlan });
  }
}
