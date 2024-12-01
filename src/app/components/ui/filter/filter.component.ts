import { ChangeDetectionStrategy, Component, computed, input, InputSignal, output, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IFilter } from '../../../type_iterfaces/filter.interface';
import { FormsModule, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { FilterListType } from '../../../type_iterfaces/filterListType';

@Component({
    selector: 'app-filter',
    imports: [FormsModule, MatRadioModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent{
    filterList: InputSignal<IFilter[]> = input.required<IFilter[]>();
    transformLable: Signal<IFilter[]> = computed(() => this.filterList().map((item) => ({
        ...item,
        name: `by ${item.name}`
    })))
    filterForm = new FormGroup({
        filterParams: new FormControl(),
    });
    filterOption = output<FilterListType | null>();

    applyFilter (){
        this.filterOption.emit(this.filterForm.get('filterParams')?.value);
    }

    clearFilter (){
        this.filterForm.reset();
        this.filterOption.emit(null);
    }
}
