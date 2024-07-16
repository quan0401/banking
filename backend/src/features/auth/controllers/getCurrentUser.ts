import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '~services/db/auth.service';
import { NotAuthorizedError } from '@quan0401/ecommerce-shared';

export class GetCurrentUser {
  public async get(req: Request, res: Response): Promise<void> {
    const user = await authService.findUserById(req.params.authId);
    if (user) {
      res.status(StatusCodes.OK).json({
        message: 'Get current user successfully',
        user
      });
    } else {
      throw new NotAuthorizedError('User not found', 'GetCurrentUser');
    }
  }
}
