import { Router } from 'express';
import { GetCurrentUser } from '~auth/controllers/getCurrentUser';
import { Password } from '~auth/controllers/password';
import { Signin } from '~auth/controllers/signin';
import { Signout } from '~auth/controllers/signout';
import { Signup } from '~auth/controllers/signup';
import { UpdateAuthInfo } from '~auth/controllers/updateAuthInfo';
import { VerifyEmail } from '~auth/controllers/verfiy-email';
import { verifyUser } from '~global/helpers/auth-middleware';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/signup', Signup.prototype.signup);
    this.router.post('/signin', Signin.prototype.user);
    this.router.post('/signout', Signout.prototype.update);
    this.router.post('/verify-email', VerifyEmail.prototype.verify);
    this.router.post('/forgot-password', Password.prototype.forgotPassword);
    this.router.post('/reset-password/:token', Password.prototype.resetPassword);
    // protected routes
    this.router.get('/auth/currentUser/:authId', verifyUser, GetCurrentUser.prototype.get);
    this.router.put('/update/info', verifyUser, UpdateAuthInfo.prototype.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
