import { IReportDataInterface } from "../type_iterfaces/reportData.interface";

export const DUMMY_DATA: IReportDataInterface[] = [
    {
        id: 1,
        name: 'Salary',
        amount: 2000.50,
        transactionType:"income",
        category: "salary",
        transactionDate: new Date('July 17, 1984 01:15:00.250').getTime(),
    },
    {
        id: 2,
        name: 'Food Shop',
        amount: 135.50,
        transactionType:"expense",
        category: "groceries",
        transactionDate: new Date('July 21, 1983 01:15:00.250').getTime(),
    },
    {
        id: 3,
        name: 'Cinema',
        amount: 20.35,
        transactionType:"expense",
        category: "groceries",
        transactionDate: new Date('June 21, 1985 01:15:00.250').getTime(),
    },
];