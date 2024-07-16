import { BadRequestError } from '@quan0401/ecommerce-shared';
import axios from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '~/config';
import { joiValidation } from '~global/decorators/joi-validation.decorator';
import { transactionService } from '~services/db/transaction.service';
import { IMoMoResponse, ITransactionDocument, ITransactionResult } from '~transaction/interfaces/transaction.interface';
import { transactionScheme } from '~transaction/schemes/transaction.scheme';
import * as crypto from 'crypto';

export class Pay {
  // pay
  // scheduledPay
  @joiValidation(transactionScheme)
  public async pay(req: Request, res: Response): Promise<void> {
    const { savingPlanId } = req.params;
    const { bankAccountId, amount, transactionType } = req.body;
    const transactionDoc: ITransactionDocument = {
      userId: req.currentUser!.id,
      bankAccountId,
      amount,
      savingPlanId,
      transactionDate: new Date(),
      transactionType
    };
    const momoResponse = await Pay.prototype.momo(amount, savingPlanId);
    console.log('momoResponse:::::: ', momoResponse);
    const result: ITransactionResult = await transactionService.makePayment(transactionDoc as Required<ITransactionDocument>);
    res.status(StatusCodes.CREATED).json({ message: 'Return momo url', result: momoResponse, transaction: result.transaction });
  }

  public async momo(amount: string, savingPlanId: string): Promise<void> {
    {
      //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
      //parameters
      const accessKey = `${config.MOMO_ACCESS_KEY}`;
      const secretKey = `${config.MOMO_SECRET_KEY}`;
      var orderInfo = 'pay with MoMo';
      var partnerCode = 'MOMO';
      var redirectUrl = `http://localhost:3002/checkout/${savingPlanId}`;
      var ipnUrl = 'http://localhost:6969/api/v1/transaction/test';
      var requestType = 'payWithMethod';
      var orderId = partnerCode + new Date().getTime();
      var requestId = orderId;
      var extraData = '';
      var orderGroupId = '';
      var autoCapture = true;
      var lang = 'vi';

      //before sign HMAC SHA256 with format
      //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
      var rawSignature =
        'accessKey=' +
        accessKey +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;
      //puts raw signature
      // console.log('--------------------RAW SIGNATURE----------------');
      // console.log(rawSignature);
      //signature
      const crypto = require('crypto');
      var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
      // console.log('--------------------SIGNATURE----------------');
      // console.log(signature);

      //json object send to MoMo endpoint
      const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: 'Test',
        storeId: 'MomoTestStore',
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
      });

      const options = {
        method: 'POST',
        url: 'https://test-payment.momo.vn/v2/gateway/api/create',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
      };
      return (await axios(options)).data;
    }
  }
  // This works but some thing gone wrong with momo

  // public async checkPaymentStatus(req: Request, res: Response): Promise<void> {
  //   const { orderId, transactionId, savingPlanId } = req.body;

  //   if (!orderId) {
  //     throw new BadRequestError('orderId is required', 'CheckPaymentStatus');
  //   } else if (!transactionId) {
  //     throw new BadRequestError('transactionId is required', 'CheckPaymentStatus');
  //   }

  //   // const signature = accessKey=$accessKey&orderId=$orderId&partnerCode=$partnerCode
  //   // &requestId=$requestId
  //   const accessKey = `${config.MOMO_ACCESS_KEY}`;
  //   const secretKey = `${config.MOMO_SECRET_KEY}`;
  //   const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  //   const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  //   const requestBody = JSON.stringify({
  //     partnerCode: 'MOMO',
  //     requestId: orderId,
  //     orderId: orderId,
  //     signature: signature,
  //     lang: 'vi'
  //   });

  //   // options for axios
  //   const options = {
  //     method: 'POST',
  //     url: 'https://test-payment.momo.vn/v2/gateway/api/query',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: requestBody
  //   };

  //   const result: IMoMoResponse = (await axios(options)).data;

  //   if (result.resultCode === 0) {
  //     await transactionService.markPaymentStatus(req.currentUser!.id, transactionId, savingPlanId, 1);
  //     res.status(StatusCodes.OK).json({ message: 'Payment success', resultCode: result.resultCode });
  //   } else {
  //     res.status(StatusCodes.BAD_REQUEST).json({ message: 'Payment failed', resultCode: result.resultCode });
  //   }
  // }

  public async checkPaymentStatus(req: Request, res: Response): Promise<void> {
    const { orderId, transactionId, savingPlanId } = req.body;

    if (!orderId) {
      throw new BadRequestError('orderId is required', 'CheckPaymentStatus');
    } else if (!transactionId) {
      throw new BadRequestError('transactionId is required', 'CheckPaymentStatus');
    }

    await transactionService.markPaymentStatus(req.currentUser!.id, transactionId, savingPlanId, 1);
    res.status(StatusCodes.OK).json({ message: 'Payment success', resultCode: 0 });
  }

  public async topUpMoreForTransaction(req: Request, res: Response): Promise<void> {
    const { transactionId } = req.params;
    const { amount } = req.body;
    const transaction = await transactionService.topUpMoreMoneyOnExistingTransaction(amount, transactionId);
    res.status(StatusCodes.OK).json({ message: 'Top up more for transaction success', transaction });
  }
}
