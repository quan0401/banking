import { Application } from 'express';
import { adminRoutes } from '~auth/routes/admin.routes';
import { authRoutes } from '~auth/routes/auth.routes';
import { verifyUser } from '~global/helpers/auth-middleware';
import { savingPlanRoutes } from '~savingPlan/routes/savingPlan.routes';
import { bankRoutes } from '~transaction/routes/bank.routes';
import { transactionRoutes } from '~transaction/routes/transaction.routes';
import { userSavingRoutes } from '~userSaving/routes/userSaving.routes';
import { chatRoutes } from './features/chat/routes/chat.routes';

const BASE_URL = '/api/v1';
export default (app: Application) => {
  const routes = () => {
    app.use(BASE_URL, authRoutes.routes());
    // Verified routes
    app.use(BASE_URL, verifyUser, savingPlanRoutes.routes());
    app.use(BASE_URL, verifyUser, bankRoutes.routes());
    app.use(BASE_URL, verifyUser, transactionRoutes.routes());
    app.use(BASE_URL, verifyUser, userSavingRoutes.routes());
    app.use(BASE_URL, verifyUser, adminRoutes.routes());
    app.use(BASE_URL, verifyUser, chatRoutes.routes());
  };
  routes();
};
