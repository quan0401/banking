import { uploads, BadRequestError } from '@quan0401/ecommerce-shared';
import { UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '~/config';
import { updateScheme } from '~auth/schemes/updateAuthInfo';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { authService } from '~services/db/auth.service';

export class UpdateAuthInfo {
  @joiValidation(updateScheme)
  public async update(req: Request, res: Response): Promise<void> {
    const { username, cccd, homeAddress, phone, profilePicture } = req.body;
    let response: UploadApiResponse | null = null;
    if (profilePicture) {
      response = (await uploads(profilePicture, config.CLOUD_FOLDER!)) as UploadApiResponse;
      if (!response?.public_id) throw new BadRequestError('File upload error, please try again!', 'UpdateAuthInfo cloudinary uploads');
    }

    const user = await authService.updateAuthInfo(`${req.currentUser?.id}`, {
      username,
      cccd,
      homeAddress,
      phone,
      ...(response?.public_id && { profilePicture: response.secure_url })
    });

    res.status(StatusCodes.OK).json({ message: 'Update auth info successfully', user });
  }
}
