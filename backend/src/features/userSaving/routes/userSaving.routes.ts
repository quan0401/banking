import { Router } from 'express';
import { verifyAdmin } from '~global/helpers/auth-middleware';
import { CreateSavingPlan } from '~savingPlan/controllers/createSavingPlan';
import { DeleteSavingPlan } from '~savingPlan/controllers/deleteSavingPlan';
import { GetSavingPlan } from '~savingPlan/controllers/getSavingPlan';
import { UpdateSavingPlan } from '~savingPlan/controllers/updateSavingPlan';
import { GetUserSaving } from '~userSaving/controllers/getUserSaving';

class UserSavingRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.get('/userSaving/:userId', GetUserSaving.prototype.getByUserId);
    this.router.get('/userSaving/:userId/:savingPlanId', GetUserSaving.prototype.getBySavingPlanId);

    return this.router;
  }
}

export const userSavingRoutes: UserSavingRoutes = new UserSavingRoutes();
