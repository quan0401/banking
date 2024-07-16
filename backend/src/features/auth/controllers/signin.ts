import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument, IAuthPayload } from '~auth/interfaces/auth.interface';
import { AuthModel } from '~auth/models/auth.model';
import { loginSchema } from '~auth/schemes/signin.scheme';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { authService } from '~services/db/auth.service';
import jwt from 'jsonwebtoken';
import { config } from '~/config';

export class Signin {
  @joiValidation(loginSchema)
  public async user(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user: IAuthDocument | null = (await authService.findUserByEmailOrPhone('', email)) as IAuthDocument | null;
    if (!user) throw new BadRequestError('User not exists', 'singin');
    const matched: boolean = await AuthModel.prototype.comparePassword(password, user.password!);
    if (!matched) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Invalid Credentials'
      });
      return;
    }
    const payload: IAuthPayload = {
      id: user!.id as string,
      username: user!.username as string,
      email: user!.email as string,
      phone: user!.phone as string
    };
    req.session = { jwt: jwt.sign(payload, config.JWT_TOKEN!) };

    res.status(StatusCodes.OK).json({ message: 'Welcomeback', user });
  }
}
