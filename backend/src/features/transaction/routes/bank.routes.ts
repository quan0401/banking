import { Router } from 'express';
import { AddBankAccount } from '~transaction/controllers/bankAccount/addBankAccount';
import { DeleteBankAccount } from '~transaction/controllers/bankAccount/deleteBankAccount';
import { GetBankAccount } from '~transaction/controllers/bankAccount/getBankAccount';
import { UpdateBankAccount } from '~transaction/controllers/bankAccount/updateBankAccount';

class BankRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }
  public routes(): Router {
    this.router.post('/bankAccount', AddBankAccount.prototype.add);
    this.router.get('/bankAccount/:bankAccountId', GetBankAccount.prototype.byId);
    this.router.get('/bankAccount', GetBankAccount.prototype.allAccountsOfUser);
    this.router.delete('/bankAccount/delete/all', DeleteBankAccount.prototype.allAccountsOfUser);
    this.router.delete('/bankAccount/:bankAccountId', DeleteBankAccount.prototype.byId);
    this.router.put('/bankAccount/:bankAccountId', UpdateBankAccount.prototype.byId);
    return this.router;
  }
}

export const bankRoutes: BankRoutes = new BankRoutes();
