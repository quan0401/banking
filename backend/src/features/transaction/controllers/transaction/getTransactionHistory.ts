import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { transactionService } from '~services/db/transaction.service';
import { ITransactionDocument } from '~transaction/interfaces/transaction.interface';
import { TransactionModel } from '~transaction/models/transaction.model';

export class GetTransactionHistory {
  // TODO:
  // historyPaginate
  // historyByDate
  // withdrawHistoryOnly
  public async all(req: Request, res: Response): Promise<void> {
    const transactions: ITransactionDocument[] = await transactionService.getAllTransactionsOfUser(req.currentUser!.id);
    await TransactionModel.destroy({
      where: {
        isSuccessful: 0
      }
    });
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions successfully',
      transactions
    });
  }

  public async transactionByPlanIdAndUserId(req: Request, res: Response): Promise<void> {
    const { savingPlanId } = req.params;
    const transactions: ITransactionDocument[] = await transactionService.getTransactionsOfUserBySavingPlan(
      req.currentUser!.id,
      savingPlanId
    );
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions by PlanId successfully',
      transactions
    });
  }

  public async transactionsByPlanId(req: Request, res: Response): Promise<void> {
    const { savingPlanId } = req.params;
    const transactions: ITransactionDocument[] = await transactionService.getTransactionsOfUserBySavingPlan(
      req.currentUser!.id,
      savingPlanId
    );
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions by PlanId successfully',
      transactions
    });
  }

  public async getTransactionsOfUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const transactions: ITransactionDocument[] = await transactionService.getAllTransactionsOfUser(userId);
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions of user successfully',
      transactions
    });
  }

  public async transactionsByDate(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.params;
    const transactions: ITransactionDocument[] = await transactionService.getTransactionsByDate(
      req.currentUser!.id,
      new Date(startDate),
      new Date(endDate)
    );
    res.status(StatusCodes.CREATED).json({
      message: 'Get all trancsactions by date successfully',
      transactions
    });
  }
}
