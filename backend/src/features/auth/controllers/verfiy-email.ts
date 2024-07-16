import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { verifyEmailScheme } from '~auth/schemes/verfiy-email.scheme';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { authService } from '~services/db/auth.service';

export class VerifyEmail {
  @joiValidation(verifyEmailScheme)
  public async verify(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    const user: IAuthDocument | undefined = await authService.findUserByEmailToken(token);
    if (!user) {
      throw new BadRequestError('Verification token is either invalid or is already used.', 'VerifyEmail verify method error');
    }
    const updated: IAuthDocument | undefined = await authService.updateVerifyEmail(user.id as string, 1);

    res.status(StatusCodes.OK).json({ message: 'Verify Email successfully', user: updated });
  }
}
