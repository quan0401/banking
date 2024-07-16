import {
  ICheckPaymentStatusPayload,
  IMakePaymentPayload,
} from "@interfaces/features/transaciontion.interface";
import axios from "@services/axios";

class TransactionService {
  async pay(planId: string, data: IMakePaymentPayload) {
    const response = await axios.post(`/transaction/pay/${planId}`, data);
    return response;
  }
  async transactionByPlanIdAndUserId(planId: string) {
    const response = await axios.get(
      `/transaction/all/savingPlan/${planId}/user`
    );
    return response;
  }
  async checkPaymentStatus(data: ICheckPaymentStatusPayload) {
    const response = await axios.post(
      `/transaction/check-payment-status`,
      data
    );
    return response;
  }
  async getAllOfUser() {
    const response = await axios.get(`/transaction/all`);
    return response;
  }
  async getAllOfUserById(userId: string) {
    const response = await axios.get(`/transaction/user/${userId}`);
    return response;
  }
  async getTransactionsByDate(startDate: Date, endDate: Date) {
    const response = await axios.get(
      `/transaction/byDate/${startDate}/${endDate}`
    );
    return response;
  }
  async withdrawByTransactionId(transactionId: string) {
    const response = await axios.post(`/transaction/withdraw/${transactionId}`);
    return response;
  }
  async withdrawAmountByTransactionId(transactionId: string, amount: number) {
    const response = await axios.post(
      `/transaction/withdraw/amount/${transactionId}`,
      { amount }
    );
    return response;
  }
  async topUpMoreForTransaction(transactionId: string, amount: number) {
    const response = await axios.post(
      `/transaction/pay/more/${transactionId}`,
      { amount }
    );
    return response;
  }
}

export const transactionService = new TransactionService();
