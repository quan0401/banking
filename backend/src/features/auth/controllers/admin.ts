import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';
import { loginSchema } from '~auth/schemes/signin.scheme';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { authService } from '~services/db/auth.service';

export class Admin {
  @joiValidation(loginSchema)
  // get users
  public async requestToBecomeAdmin(req: Request, res: Response): Promise<void> {}
  public async getUsers(req: Request, res: Response): Promise<void> {
    const { limit, offset } = req.params;
    const result = await authService.getUsersPagination(parseInt(`${limit}`), parseInt(`${offset}`));
    res.status(StatusCodes.CREATED).json({
      message: 'Get users successfully',
      ...result
    });
  }
  public async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await authService.findUserById(id);
    res.status(StatusCodes.OK).json({
      message: 'Get user successfully',
      user
    });
  }
}
