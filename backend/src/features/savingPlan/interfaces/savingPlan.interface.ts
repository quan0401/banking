export interface ISavingPlanDocument {
  id?: string;
  termPeriod?: number;
  minimumBalance?: number;
  maximumBalance?: number;
  minimumEachTransaction?: number;
  maximumEachTransaction?: number; // Added this field
  interestRate?: number;
  interestRateBeforeDueDate?: number; // Added this field
  title?: string;
  description?: string;
  basicDescription?: string;
  isActive?: 1 | 0; // Changed type to boolean for consistency
  startDate?: Date;
  endDate?: Date | null;
  currency?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
