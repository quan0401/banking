import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { bankService } from '~services/db/bank.service';
import { IBankAccountDocument } from '~transaction/interfaces/bankAccount.interface';
import { bankAccountScheme } from '~transaction/schemes/bank.scheme';

export class AddBankAccount {
  @joiValidation(bankAccountScheme)
  public async add(req: Request, res: Response): Promise<void> {
    const { accountHolder, bankName, accountNumber, ownerAddress, ownerContact, accountType, currency, branch, status } = req.body;

    const BankAccountDocument: IBankAccountDocument = {
      userId: req.currentUser!.id,
      accountHolder,
      bankName,
      accountNumber,
      ownerAddress,
      ownerContact,
      accountType,
      currency,
      branch,
      status
    };
    const createdAccount: IBankAccountDocument = await bankService.add(BankAccountDocument);
    res.status(StatusCodes.CREATED).json({
      message: 'Add Bank Account successfully',
      bankAccount: createdAccount
    });
  }
}
