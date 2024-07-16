import { Router } from 'express';
import { verifyAdmin } from '~global/helpers/auth-middleware';
import { CreateSavingPlan } from '~savingPlan/controllers/createSavingPlan';
import { DeleteSavingPlan } from '~savingPlan/controllers/deleteSavingPlan';
import { GetSavingPlan } from '~savingPlan/controllers/getSavingPlan';
import { UpdateSavingPlan } from '~savingPlan/controllers/updateSavingPlan';

class SavingPlanRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.get('/savingPlan/:planId', GetSavingPlan.prototype.getById);
    this.router.get('/savingPlan', GetSavingPlan.prototype.all);

    this.router.post('/savingPlan', verifyAdmin, CreateSavingPlan.prototype.create);
    this.router.put('/savingPlan/:planId', verifyAdmin, UpdateSavingPlan.prototype.byId);
    this.router.delete('/savingPlan/:planId', verifyAdmin, DeleteSavingPlan.prototype.byId);

    return this.router;
  }
}

export const savingPlanRoutes: SavingPlanRoutes = new SavingPlanRoutes();
