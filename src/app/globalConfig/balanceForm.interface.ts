import { FormControl } from "@angular/forms";
import { TransactionType } from "../type_iterfaces/transactionType";
import { CategoryType } from "../type_iterfaces/categoryType";

export interface IBalanceForm {
    name: FormControl<string | null>;
    amount: FormControl<number | null>;
    transactionType: FormControl<TransactionType | null>;
    category: FormControl<CategoryType | null>;
    transactionDate: FormControl<Date | null>
}