import { BadRequestError } from '@quan0401/ecommerce-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { bankService } from '~services/db/bank.service';
import { IBankAccountDocument } from '~transaction/interfaces/bankAccount.interface';
import { bankAccountScheme } from '~transaction/schemes/bank.scheme';

export class UpdateBankAccount {
  @joiValidation(bankAccountScheme)
  public async byId(req: Request, res: Response): Promise<void> {
    const { bankAccountId } = req.params;
    const { accountHolder, bankName, accountNumber, ownerAddress, ownerContact, accountType, currency, branch, status } = req.body;

    const bankAccountDocument: IBankAccountDocument = {
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
    const createdAccount: IBankAccountDocument | undefined = await bankService.updateBankAccount(
      bankAccountId,
      bankAccountDocument as Required<IBankAccountDocument>
    );
    if (createdAccount === undefined) {
      throw new BadRequestError('BankAccount not found', 'UpdateBankAccount');
    }
    res.status(StatusCodes.CREATED).json({
      message: 'Update Bank Account successfully',
      bankAccount: createdAccount
    });
  }
}
