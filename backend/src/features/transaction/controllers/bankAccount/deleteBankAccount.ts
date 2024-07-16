import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { bankService } from '~services/db/bank.service';

export class DeleteBankAccount {
  public async allAccountsOfUser(req: Request, res: Response): Promise<void> {
    await bankService.deleteAllBankAccountsOfUser(req.currentUser!.id);
    res.status(StatusCodes.OK).json({
      message: 'Delete all bank accounts of user successfully'
    });
  }
  public async byId(req: Request, res: Response): Promise<void> {
    await bankService.deleteBankAccountById(req.params.bankAccountId);
    res.status(StatusCodes.OK).json({
      message: 'Delete bank account successfully'
    });
  }
}
