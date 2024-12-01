import { AfterViewInit, ChangeDetectionStrategy, Component, input, InputSignal, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITableHeaderInterface } from '../../../type_iterfaces/table.interface';
import { FilterListType } from '../../../type_iterfaces/filterListType';
import { DatePipe } from '@angular/common';
import { PIPE_DATE_COLUMN } from './config';

@Component({
    selector: 'app-table',
    imports: [MatTableModule, MatSortModule, DatePipe],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterViewInit, OnInit, OnChanges{
    tableData: InputSignal<T[]> = input.required<T[]>();
    columntTable: InputSignal<ITableHeaderInterface[]> = input.required<ITableHeaderInterface[]>();
    filterTable: InputSignal<FilterListType | null> = input<FilterListType | null>(null);
    dataSource!: MatTableDataSource<T>;
    displayColumn: string[] = [];
    PIPE_DATE_COLUMN = PIPE_DATE_COLUMN;

    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit (): void {
        this.displayColumn = this.columntTable().map((item) => item.name);
    }

    ngAfterViewInit (){
        this.dataSource.sort = this.sort;
    }

    ngOnChanges (changes: SimpleChanges): void {
        if (changes['tableData']) {
            this.dataSource = new MatTableDataSource(this.tableData());
        }
        
        if (changes['filterTable']?.currentValue){
            this.applyFilter(changes['filterTable'].currentValue);
        }
        if (changes['filterTable']?.currentValue === null && !changes['filterTable']?.firstChange){
            this.applyFilter('');
        }
    }

    applyFilter (filterParams: string){
        filterParams.length ?
            this.dataSource.filter = filterParams :
            this.dataSource.filter = filterParams.trim();
    }
}
