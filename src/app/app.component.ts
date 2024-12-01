import { Component } from '@angular/core';
import { ListlayoutComponent } from "./components/listlayout/listlayout.component";

@Component({
    selector: 'app-root',
    imports: [ListlayoutComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent
{
    title = 'UrsulovTest';
}
