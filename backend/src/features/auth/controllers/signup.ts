import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthDocument, ISignUpPayload } from '~auth/interfaces/auth.interface';
import { authService } from '~services/db/auth.service';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { signupScheme } from '~auth/schemes/signup.scheme';
import { BadRequestError, uploads } from '@quan0401/ecommerce-shared';
import { config } from '~/config';
import { UploadApiResponse } from 'cloudinary';
import { faker } from '@faker-js/faker';
import { AuthModel } from '~auth/models/auth.model';

export class Signup {
  @joiValidation(signupScheme)
  public async signup(req: Request, res: Response): Promise<void> {
    const { username, password, email, phone, cccd, homeAddress, profilePicture } = req.body as ISignUpPayload;
    const isExisted = await authService.findUserByEmailOrPhone('', email);
    if (isExisted) throw new BadRequestError('User already exists', 'Signup');

    const profilePublicId: string = uuidv4();
    const randomBytes: Buffer = crypto.randomBytes(20);
    const randomCharacters: string = randomBytes.toString('hex');

    // upload image to cloudinary
    const response: UploadApiResponse = (await uploads(profilePicture, config.CLOUD_FOLDER!)) as UploadApiResponse;
    if (!response?.public_id) throw new BadRequestError('File upload error, please try again!', 'Signup cloudinary uploads');
    const profilePictureUrl = response.url;
    const userData: IAuthDocument = {
      profilePublicId,
      username,
      email,
      phone,
      password,
      cccd,
      homeAddress,
      profilePicture: profilePictureUrl,
      emailVerificationToken: randomCharacters,
      isAdmin: 0
    } as IAuthDocument;

    // upload to database
    const result: IAuthDocument = await authService.createNewUser(userData);

    res.status(StatusCodes.CREATED).json({ message: 'Create user successfully', user: result });
  }

  public async seed(req: Request, res: Response): Promise<void> {
    const { count } = req.params;
    const numUsers = parseInt(count, 10);

    if (isNaN(numUsers) || numUsers <= 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid count parameter' });
      return;
    }

    const users: IAuthDocument[] = [];

    for (let i = 0; i < numUsers; i++) {
      const profilePublicId: string = uuidv4();
      const randomBytes: Buffer = crypto.randomBytes(20);
      const randomCharacters: string = randomBytes.toString('hex');

      const profilePictureUrl = faker.image.avatar(); // Generating a random avatar image

      const user: IAuthDocument = {
        profilePublicId,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: faker.internet.password(),
        cccd: faker.string.numeric(12),
        homeAddress: faker.address.streetAddress(),
        profilePicture: profilePictureUrl,
        emailVerificationToken: randomCharacters,
        isAdmin: 0
      } as IAuthDocument;

      users.push(user);
    }

    // Uploading all users to the database
    const createdUsers = await AuthModel.bulkCreate(users);

    res.status(StatusCodes.CREATED).json({ message: `Created ${createdUsers.length} users successfully`, users: createdUsers });
  }
}
