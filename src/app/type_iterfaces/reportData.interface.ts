import { CategoryType } from "./categoryType";
import { TransactionType } from "./transactionType";

export interface IReportDataInterface {
    id: number;
    name: string;
    amount: number;
    transactionType: TransactionType;
    category: CategoryType;
    transactionDate: number;
}