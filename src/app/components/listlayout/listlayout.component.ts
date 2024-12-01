import { Component, inject, OnInit } from '@angular/core';
import { ReportdataService } from '../../services/reportdata.service';
import { IReportDataInterface } from '../../type_iterfaces/reportData.interface';
import { TableComponent } from "../ui/table/table.component";
import { ITableHeaderInterface } from '../../type_iterfaces/table.interface';
import { FilterComponent } from "../ui/filter/filter.component";
import { IFilter } from '../../type_iterfaces/filter.interface';
import { FILTER_LIST } from '../../globalConfig/filterList';
import { FilterListType } from '../../type_iterfaces/filterListType';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReportFormComponent } from '../ui/report-form/report-form.component';
import { COLUMN_HEADER } from '../../globalConfig/columnHeader';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-listlayout',
    imports: [TableComponent, FilterComponent, MatDialogModule, MatButtonModule],
    templateUrl: './listlayout.component.html',
    styleUrl: './listlayout.component.scss'
})
export class ListlayoutComponent implements OnInit {
    readonly dialog: MatDialog = inject(MatDialog);
    readonly reportdataService = inject(ReportdataService);
    reportData: IReportDataInterface[] = [];
    totalBalance: number = 0;
    coluumnTable: ITableHeaderInterface[] = COLUMN_HEADER;
    filterList: IFilter[] = FILTER_LIST;
    filterOption: FilterListType | null = null;


    ngOnInit (): void {
        this.initData();
    }

    initData () {
        this.reportdataService.initData();
        this.reportData = this.reportdataService.currentData();
        this.totalBalance = this.reportdataService.totalBalanse();
    }

    openDialog (){
        const dialogRef = this.dialog.open(ReportFormComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if(result) {
                this.reportData = this.reportdataService.currentData();
                this.totalBalance = this.reportdataService.totalBalanse();
            }
        })
    }

    filterParams (event: FilterListType | null){
        this.filterOption = event;
    }
}
