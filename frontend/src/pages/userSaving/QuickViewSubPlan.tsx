import { useCountDown } from "@hooks/useCountDown";
import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { transactionService } from "@services/api/transaction/transaction.service";
import ApprovalModal from "@shared/modals/ApprovalModal";
import { IApprovalModalContent } from "@shared/modals/interfaces/modal.interface";
import { calculateBaseOnTransactions } from "@utils/calculator.service";
import { TimeAgo } from "@utils/timeago.utils";
import {
  formatLargeNumber,
  showErrorToast,
  showSuccessToast,
} from "@utils/utils.service";
import { FC, ReactElement, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

interface IQuickViewSubPlanProps {
  transaction: ITransactionDocument;
  savingPlan: ISavingPlanDocument;
  setFetchNewData: () => void;
}

const QuickViewSubPlan: FC<IQuickViewSubPlanProps> = ({
  transaction,
  savingPlan,
  setFetchNewData,
}): ReactElement => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [showWithDrawModal, setShowWithDrawModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<string>("");
  const compound = calculateBaseOnTransactions([transaction], savingPlan);
  const modalContent: IApprovalModalContent = {
    header: "Are you sure you want to withdraw?",
    body: `You will get your initial amount (${
      formatLargeNumber(transaction.amount!) + ` ${savingPlan.currency}`
    })  + interest accrued on this plan (${
      formatLargeNumber(compound - transaction.amount!) +
      ` ${savingPlan.currency}`
    }) . Total: ${formatLargeNumber(compound) + ` ${savingPlan.currency}`}`,
    btnText: "Withdraw",
    btnColor: "bg-green",
  };
  const modelWithdrawAmount: IApprovalModalContent = {
    header: "Are you sure you want to withdraw?",
    body: `Hi`,
    btnText: "Withdraw",
    btnColor: "bg-green",
  };
  const modalWarningContent: IApprovalModalContent = {
    header: "Are you sure you want to withdraw?",
    body: `This action is irreversible. You will loose all interest accrued on this plan (${
      formatLargeNumber(compound - transaction.amount!) +
      ` ${savingPlan.currency}`
    }), since it has not matured yet.`,
    btnText: "Withdraw",
    btnColor: "bg-rose-400",
  };
  const modalTopup: IApprovalModalContent = {
    header: "Are you sure, you want to top up more",
    body: "Top up more",
    btnText: "Confirm",
    btnColor: "bg-blue-400",
  };

  const handleWithdraw = async () => {
    try {
      let res;
      // console.log(
      //   "savingPlan.termPeriod",
      //   savingPlan.termPeriod,
      //   savingPlan.termPeriod === 0
      // );

      if (savingPlan.termPeriod === 0) {
        res = await transactionService.withdrawAmountByTransactionId(
          `${transaction.id}`,
          amount
        );
      } else {
        res = await transactionService.withdrawByTransactionId(
          `${transaction.id}`
        );
      }
      showSuccessToast(res.data.message);
    } catch (error) {
      showErrorToast("Failed to withdraw");
    }
    setShowWithDrawModal(false);
    setShowWithDrawAmount(false);
    setFetchNewData();
  };

  const checkMature = (date: Date, termPeriod: number) => {
    const toDate = new Date(date);
    toDate.setMonth(toDate.getMonth() + termPeriod);

    const toDate_1 = new Date(toDate);
    toDate_1.setDate(toDate_1.getDate() + (termPeriod === 0 ? 15 : 3));

    const currentDate = new Date();

    return termPeriod > 0
      ? toDate < currentDate && currentDate < toDate_1
      : currentDate > toDate_1;
  };

  const hasMatured = checkMature(
    new Date(`${transaction.transactionDate}`),
    parseInt(`${savingPlan.termPeriod}`)
  );
  const handleMakePayment = async () => {
    try {
      await transactionService.topUpMoreForTransaction(
        `${transaction.id}`,
        amount
      );
      showSuccessToast("Top up successfully");
      setShowWithDrawModal(false);
      setFetchNewData();
    } catch (error) {
      showErrorToast("Failed to top up");
    }
  };

  let days, hours, minutes, seconds;

  if (hasMatured && savingPlan?.termPeriod! > 0) {
    const toDate = new Date(`${transaction.transactionDate}`);

    toDate.setMonth(toDate.getMonth() + savingPlan?.termPeriod!);

    const toDate_1 = new Date(toDate);
    toDate_1.setDate(toDate_1.getDate() + 3);

    [days, hours, minutes, seconds] = useCountDown(`${toDate_1}`);
  }

  const [showWithDrawAmount, setShowWithDrawAmount] = useState<boolean>(false);

  return (
    <div>
      {showWithDrawModal && (
        <ApprovalModal
          approvalModalContent={
            type === "top-up"
              ? modalTopup
              : hasMatured
              ? modalContent
              : modalWarningContent
          }
          onClick={type === "top-up" ? handleMakePayment : handleWithdraw}
          onClose={() => {
            setShowWithDrawModal(false);
            setAmount(0);
            setType("");
          }}
          type={type}
          amount={amount}
          setAmount={setAmount}
          savingPlan={savingPlan}
          handleMakePayment={handleMakePayment}
        />
      )}

      {showWithDrawAmount && (
        <ApprovalModal
          approvalModalContent={modelWithdrawAmount}
          onClick={handleWithdraw}
          onClose={() => {
            setShowWithDrawAmount(false);
            setAmount(0);
            setType("");
          }}
          type={"withdrawAmount"}
          amount={amount}
          maxiumWithdrawAmount={compound}
          setAmount={setAmount}
          savingPlan={savingPlan}
          transaction={transaction}
        />
      )}
      <div className="flex justify-between px-2 py-3 rounded-lg ">
        <div className="flex items-center">
          <div
            className="hover:opacity-80"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            {toggleDropdown ? <FaAngleUp /> : <FaAngleDown />}
          </div>
          <div className=" ml-4 flex flex-col items-start">
            <p className="font-bold text-lg flex items-center justify-between">
              {transaction.transactionType === 1 ? "Available" : "Unavailable"}{" "}
              <FaCirclePlus className="text-green ml-4" />
            </p>

            <p className="line-clamp-1 text-gray">
              Last Transaction Date:{" "}
              {TimeAgo.dayWithTime(`${transaction.transactionDate}`)}
            </p>
          </div>
          {hasMatured && (
            <>
              <button
                className="btn btn--secondary ml-4"
                onClick={(e) => {
                  e.stopPropagation();
                  if (savingPlan?.termPeriod === 0) {
                    setShowWithDrawAmount(true);
                  } else setShowWithDrawModal(true);
                }}
              >
                WithDraw
              </button>
              <button
                className="btn btn--secondary ml-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setType("top-up");
                  setShowWithDrawModal(true);
                }}
              >
                Top up more
                {savingPlan?.termPeriod! > 0 && (
                  <div className="flex justify-between text-center gap-2">
                    <div className="flex flex-col text-sm font-bold md:text-base">
                      {days}{" "}
                      <span className="text-xs font-normal md:text-sm">
                        days
                      </span>
                    </div>
                    <div className="flex flex-col text-sm font-bold md:text-base">
                      {hours}{" "}
                      <span className="text-xs font-normal md:text-sm">h</span>
                    </div>
                    <div className="flex flex-col text-sm font-bold md:text-base">
                      {minutes}{" "}
                      <span className="text-xs font-normal md:text-sm">m</span>
                    </div>
                    <div className="flex flex-col text-sm font-bold md:text-base">
                      {seconds}{" "}
                      <span className="text-xs font-normal md:text-sm">s</span>
                    </div>
                  </div>
                )}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center">
          <div>
            <p className="font-bold text-lg flex items-center justify-end">
              <span>{formatLargeNumber(transaction.amount as number)}</span>
            </p>
            <p
              className={`line-clamp-1 text-gray font-semibold text-end ${
                transaction.isSuccessful === 1 ? "text-green" : "text-rose-400"
              }`}
            >
              After compound: {formatLargeNumber(compound)}
            </p>
          </div>
        </div>
      </div>

      {toggleDropdown && (
        <div>
          <div className="p-2 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">Sub Plan ID</p>
              <p className="font-semibold line-clamp-1">{transaction.id}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">Created At</p>
              <p className="font-semibold line-clamp-1">
                {TimeAgo.dayWithTime(`${transaction.transactionDate}`)}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">Plan title</p>
              <p className="font-semibold line-clamp-1">{savingPlan.title}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">Term Period</p>
              <p className="font-semibold line-clamp-1">
                {savingPlan.termPeriod} Months
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">
                Plan interest rate
              </p>
              <p className="font-semibold line-clamp-1">
                {savingPlan.interestRate} %
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray font-bold line-clamp-1">
                Transaction Type
              </p>
              <p className="font-semibold line-clamp-1">
                {transaction.bankAccountId}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickViewSubPlan;
