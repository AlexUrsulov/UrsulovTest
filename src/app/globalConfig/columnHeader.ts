import { ITableHeaderInterface } from "../type_iterfaces/table.interface";

export const COLUMN_HEADER: ITableHeaderInterface[] = [
    {
      name: 'Transaction name',
      col: 'name',
      sortable: false,
    },
    {
      name:'Amount',
      col: 'amount',
      sortable: true,
    },
    {
      name:'Category',
      col: 'category',
      sortable: false,
    }, 
    { name: 'Date',
      col: 'transactionDate',
      sortable: true,
    }
];