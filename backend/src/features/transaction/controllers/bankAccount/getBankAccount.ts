import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { bankService } from '~services/db/bank.service';
import { IBankAccountDocument } from '~transaction/interfaces/bankAccount.interface';

export class GetBankAccount {
  public async allAccountsOfUser(req: Request, res: Response): Promise<void> {
    const accounts: IBankAccountDocument[] = await bankService.getAllUserBankAccount(req.currentUser!.id);
    res.status(StatusCodes.OK).json({
      message: 'Get all bank accounts of user successfully',
      bankAccounts: accounts
    });
  }
  public async byId(req: Request, res: Response): Promise<void> {
    const account: IBankAccountDocument | undefined = await bankService.getBankAccountById(req.params.bankAccountId);
    if (account === undefined) {
      throw new BadRequestError('BankAccount not found', 'GetBankAccount');
    }
    res.status(StatusCodes.OK).json({
      message: 'Get bank account successfully',
      bankAccount: account
    });
  }
}
