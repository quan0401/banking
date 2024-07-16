import { Router } from 'express';
import { Admin } from '~auth/controllers/admin';
import { Signup } from '~auth/controllers/signup';
import { verifyUser } from '~global/helpers/auth-middleware';

class AminRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    // protected routes
    this.router.post('/admin/auth/seed/:count', verifyUser, Signup.prototype.seed);
    this.router.get('/admin/auth/:offset/:limit', verifyUser, Admin.prototype.getUsers);
    this.router.get('/admin/auth/:id', verifyUser, Admin.prototype.getUserById);

    return this.router;
  }
}

export const adminRoutes: AminRoutes = new AminRoutes();
