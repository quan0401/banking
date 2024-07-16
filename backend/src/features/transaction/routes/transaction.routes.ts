import { Router } from 'express';
import { GetTransactionHistory } from '~transaction/controllers/transaction/getTransactionHistory';
import { Pay } from '~transaction/controllers/transaction/pay';
import { Withdraw } from '~transaction/controllers/transaction/withdraw';
import axios from 'axios';

class TransactionRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/transaction/check-payment-status', Pay.prototype.checkPaymentStatus);
    this.router.post('/transaction/pay/more/:transactionId', Pay.prototype.topUpMoreForTransaction);
    this.router.post('/transaction/pay/:savingPlanId', Pay.prototype.pay);
    this.router.post('/transaction/withdraw/amount/:transactionId', Withdraw.prototype.withdrawTransactionAmount);
    this.router.post('/transaction/withdraw/:transactionId', Withdraw.prototype.withdrawTransactions);

    this.router.get('/transaction/all/savingPlan/:savingPlanId/user', GetTransactionHistory.prototype.transactionByPlanIdAndUserId);
    this.router.get('/transaction/byDate/:startDate/:endDate', GetTransactionHistory.prototype.transactionsByDate);
    this.router.get('/transaction/savingPlan/:savingPlanId', GetTransactionHistory.prototype.transactionsByPlanId);
    this.router.get('/transaction/user/:userId', GetTransactionHistory.prototype.getTransactionsOfUser);

    this.router.get('/transaction/all', GetTransactionHistory.prototype.all);

    return this.router;
  }
}

export const transactionRoutes: TransactionRoutes = new TransactionRoutes();
