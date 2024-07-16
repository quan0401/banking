import { ChangeEvent, FC, ReactElement } from "react";
import { IModalProps } from "./interfaces/modal.interface";
import ModalBg from "./ModalBg";
import Button from "@shared/button/Button";
import { formatLargeNumber } from "@utils/utils.service";
import { isNumber } from "lodash";

const ApprovalModal: FC<IModalProps> = ({
  approvalModalContent,
  hideCancel = false,
  onClick,
  onClose,
  type,
  savingPlan,
  amount,
  setAmount,
  transaction: _transaction,
  maxiumWithdrawAmount,
}): ReactElement => {
  const { header, body, btnText, btnColor } = approvalModalContent!;
  return (
    <ModalBg>
      <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
        <div className="relative bottom-auto left-auto right-auto top-auto max-h-[90vh] max-w-[400px] bg-white p-4 text-[#404145]">
          <div className="border-grey mb-[10px] w-full border-b text-left">
            <h4 className="text-[17px] font-bold text-blue-400">{header}</h4>
          </div>
          <div className="mb-5 text-base">{body}</div>
          <div>
            {type === "top-up" &&
              isNumber(parseFloat(`${amount}`)) &&
              setAmount && (
                <div>
                  <div className="mb-3">
                    <label className="text-sm font-semibold text-black">
                      <div>
                        Minimum{" "}
                        {formatLargeNumber(savingPlan?.minimumEachTransaction!)}{" "}
                        {savingPlan?.currency}
                      </div>
                      <div>
                        Amount {formatLargeNumber(amount!)}{" "}
                        {savingPlan?.currency}
                      </div>
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e: ChangeEvent) => {
                        const value = (e.target as HTMLInputElement).value;
                        if (value === "" || parseFloat(value) < 0) return;
                        setAmount(parseFloat(value));
                      }}
                      className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none"
                    />
                  </div>
                </div>
              )}
            {type === "withdrawAmount" &&
              maxiumWithdrawAmount &&
              isNumber(parseFloat(`${amount}`)) &&
              setAmount && (
                <div>
                  <div className="mb-3">
                    <label className="text-sm font-semibold text-black">
                      <div>
                        Maximum {formatLargeNumber(maxiumWithdrawAmount)}
                      </div>
                      <div>
                        Amount {formatLargeNumber(amount!)}{" "}
                        {savingPlan?.currency}
                      </div>
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e: ChangeEvent) => {
                        const value = (e.target as HTMLInputElement).value;
                        if (value === "" || parseFloat(value) < 0) return;
                        setAmount(parseFloat(value));
                      }}
                      className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none"
                    />
                  </div>
                </div>
              )}
          </div>
          <div className="flex justify-end gap-3">
            {!hideCancel && (
              <Button
                className="rounded bg-gray-200 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base"
                label="Cancel"
                onClick={onClose}
              />
            )}
            {type !== "withdrawAmount" && (
              <Button
                className={`rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${btnColor}
                ${
                  type === "top-up" &&
                  amount! < savingPlan?.minimumEachTransaction!
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                `}
                label={`${btnText}`}
                onClick={onClick}
                disabled={
                  type === "top-up" &&
                  amount! < savingPlan?.minimumEachTransaction!
                }
              />
            )}
            {type === "withdrawAmount" && (
              <Button
                className={`rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${btnColor}
            ${
              maxiumWithdrawAmount! < amount! || amount! < 10000
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
            `}
                label={`${btnText}`}
                onClick={onClick}
                disabled={maxiumWithdrawAmount! < amount! || amount! < 10000}
              />
            )}
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default ApprovalModal;
