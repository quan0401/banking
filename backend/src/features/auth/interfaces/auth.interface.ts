declare global {
  namespace Express {
    interface Request {
      currentUser?: IAuthPayload;
    }
  }
}

export interface IAuthPayload {
  id: string;
  username: string;
  email: string;
  phone: string;
  iat?: number;
}

export interface IAuth {
  username?: string;
  password?: string;
  email?: string;
  phone: string;
  profilePicture?: string;
}

export interface IAuthDocument {
  id?: string;
  profilePublicId?: string;
  username?: string;
  email?: string;
  balance?: number;
  phone?: string;
  password?: string;
  isAdmin?: 1 | 0;
  cccd?: string;
  homeAddress?: string;
  profilePicture?: string;
  emailVerified?: number;
  emailVerificationToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface IAuthBuyerMessageDetails {
  username?: string;
  profilePicture?: string;
  email?: string;
  phone: string;
  createdAt?: Date;
  type?: string;
}

export interface IEmailMessageDetails {
  receiverEmail?: string;
  template?: string;
  verifyLink?: string;
  resetLink?: string;
  username?: string;
}
export interface IEmailLocals {
  sender?: string;
  appLink: string;
  appIcon: string;
  offerLink?: string;
  amount?: string;
  buyerUsername?: string;
  sellerUsername?: string;
  buyerEmail?: string;
  sellerEmail?: string;
  title?: string;
  description?: string;
  deliveryDays?: string;
  orderId?: string;
  orderDue?: string;
  requirements?: string;
  orderUrl?: string;
  originalDate?: string;
  newDate?: string;
  reason?: string;
  subject?: string;
  header?: string;
  type?: string;
  message?: string;
  serviceFee?: string;
  total?: string;
  username?: string;
  verifyLink?: string;
  resetLink?: string;
}

export interface ISignUpPayload {
  [key: string]: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  profilePicture: string;
}

export interface ISignInPayload {
  [key: string]: string;
  username: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
  phone: string;
}

export interface IResetPassword {
  [key: string]: string;
  password: string;
  confirmPassword: string;
}

export interface IReduxAuthPayload {
  authInfo?: IAuthDocument;
}

export interface IReduxAddAuthUser {
  type: string;
  payload: IReduxAuthPayload;
}

export interface IReduxLogout {
  type: string;
  payload: boolean;
}

export interface IAuthResponse {
  message: string;
}

export interface IAuthUser {
  profilePublicId: string | null;
  createdAt: Date | null;
  email: string | null;
  phone: string;
  emailVerificationToken: string | null;
  emailVerified: boolean | null;
  id: number | string;
  passwordResetExpires: Date | null;
  passwordResetToken: null | null;
  profilePicture: string | null;
  updatedAt: Date | null;
  username: string | null;
}
