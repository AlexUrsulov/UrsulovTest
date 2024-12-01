import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TRANSACTION_LIST } from '../../../globalConfig/transactionList';
import { IFilter } from '../../../type_iterfaces/filter.interface';
import { CATEGORY_LIST } from '../../../globalConfig/categoryList';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IBalanceForm } from '../../../globalConfig/balanceForm.interface';
import { TwoDigitDecimaNumberDirectiveDirective } from '../../../derectives/two-digit-decima-number-directive.directive';
import { ReportdataService } from '../../../services/reportdata.service';
import { IReportDataInterface } from '../../../type_iterfaces/reportData.interface';


@Component({
    selector: 'app-report-form',
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        TwoDigitDecimaNumberDirectiveDirective
    ],
    templateUrl: './report-form.component.html',
    providers: [
        provideNativeDateAdapter(),
    ],
    styleUrl: './report-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportFormComponent implements OnInit {
    TRANSACTION_LIST: IFilter[] = TRANSACTION_LIST;
    CATEGORY_LIST: IFilter[] = CATEGORY_LIST;
    formBuilder = inject(FormBuilder)
    balanceForm!: FormGroup<IBalanceForm>;
    reportdataService = inject(ReportdataService);

    ngOnInit (): void {
        this.initForm();
    }

    initForm() {
        this.balanceForm = this.formBuilder.nonNullable.group<IBalanceForm>({
            name: new FormControl(null, Validators.required),
            amount: new FormControl(null, Validators.required),
            transactionType: new FormControl(null, Validators.required),
            category: new FormControl(null, Validators.required),
            transactionDate: new FormControl(new Date()),
        })
    }

    onSubmit() {
        const newReport: IReportDataInterface = Object.assign(this.balanceForm.value);
        this.reportdataService.addReport(newReport);
        this.balanceForm.reset();
    }
}
