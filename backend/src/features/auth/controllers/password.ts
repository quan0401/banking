import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { IAuthDocument } from '~auth/interfaces/auth.interface';
import { authService } from '~services/db/auth.service';
import crypto from 'crypto';
import { config } from '~/config';
import { StatusCodes } from 'http-status-codes';
import { mailTransport } from '~services/mail/mail.transport';
import { forgotPasswordTemplate } from '~services/mail/template/forgot-password/forgot-password-template';

export class Password {
  public async forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const existingUser: IAuthDocument | undefined = await authService.findUserByEmailOrPhone('', email);
    if (!existingUser) {
      throw new BadRequestError('User with email does not exist', 'password forgotPassword()');
    }
    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');
    const date: Date = new Date();
    date.setHours(date.getHours() + 1);
    await authService.updatePasswordToken(existingUser.id!, randomCharacters, date);
    const resetLink = `${config.CLIENT_URL}/reset_password?token=${randomCharacters}`;
    const template: string = forgotPasswordTemplate.passwordResetTemplate(existingUser.username!, resetLink);
    await mailTransport.sendMail(email, 'Password Reset', template);
    res.status(StatusCodes.OK).json({ message: 'Password reset email sent. It may takes 5 minutes to arrive' });
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new BadRequestError('Passwords do not match', 'password resetPassword()');
    }
    const user: IAuthDocument | undefined = await authService.getAuthUserByPasswordToken(token);
    if (!user) {
      throw new BadRequestError('Invalid token', 'password resetPassword()');
    }
    await authService.updatePassword(user.id!, password);
    res.status(StatusCodes.OK).json({ message: 'Password reset successfully' });
  }
}
