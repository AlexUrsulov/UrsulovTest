import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { DUMMY_DATA } from '../globalConfig/dummyData';
import { IReportDataInterface } from '../type_iterfaces/reportData.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ReportdataService {
    currentData:WritableSignal<IReportDataInterface[]> = signal<IReportDataInterface[]>([]);
    totalBalanse: WritableSignal<number> = signal<number>(0)
    private DUMMY_DATA: IReportDataInterface[] = DUMMY_DATA;
    private localStoragedata: LocalStorageService = inject(LocalStorageService);

    initData (){
        if (!this.localStoragedata.getData('reportData')){
            this.localStoragedata.setData('reportData', DUMMY_DATA);
            this.currentData.update(() => DUMMY_DATA);
            this.getTotalBalance();
        } else {
            this.currentData.update(() => this.localStoragedata.getData('reportData'));
            this.getTotalBalance();
        }
    }

    addReport (report: IReportDataInterface){  
        const addReportItem: IReportDataInterface = {
            ...report,
            id: Math.ceil(Math.random() * 23),
            amount: +report.amount,
            transactionDate: new Date(`${report.transactionDate}`).getTime(),
        };
        const currentData: IReportDataInterface[] = this.currentData();
        currentData.push(addReportItem);
        this.localStoragedata.setData('reportData', currentData);
        this.currentData.update(() => this.localStoragedata.getData('reportData'));
        this.getTotalBalance();
    }

    getTotalBalance(): void {
        let income: number = this.currentData()
            .filter(item => item.transactionType === 'income')
            .reduce((acc, value) =>{ return acc + value.amount }, 0);

        const expense: number = this.currentData()
            .filter(item => item.transactionType === 'expense')
            .reduce((acc, value) =>{ return acc + value.amount }, 0);

        
        const result = income - expense;
        this.totalBalanse.set(+result.toFixed(2));
    }
}

