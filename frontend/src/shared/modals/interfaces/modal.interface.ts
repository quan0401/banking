import { ISavingPlanDocument } from "@interfaces/features/savingPlan.interface";
import { ITransactionDocument } from "@interfaces/features/transaciontion.interface";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

export interface IModalBgProps {
  children?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onToggle?: Dispatch<SetStateAction<boolean>>;
  onTogglePassword?: Dispatch<SetStateAction<boolean>>;
}

export interface IModalProps {
  header?: string;
  gigTitle?: string;
  type?: string;
  amount?: number;
  setAmount?: Dispatch<SetStateAction<number>>;
  savingPlan?: ISavingPlanDocument;
  transaction?: ITransactionDocument;
  maxiumWithdrawAmount?: number;
  handleMakePayment?: () => Promise<void>;
  approvalModalContent: IApprovalModalContent;
  hideCancel?: boolean;
  cancelBtnHandler?: () => void;
  onClick?: () => void;
  onClose?: () => void;
}

export interface IApprovalModalContent {
  header: string;
  body: string;
  btnText: string;
  btnColor: string;
}
