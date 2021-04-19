import {NgModule} from '@angular/core';
import { DomainsComponent } from './components/domains/domains.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
    declarations: [
        DomainsComponent
    ],
    imports: [
        MatTableModule,
        MatPaginatorModule
    ],
    exports: [
        DomainsComponent
    ]
})
export class DnstrustLibModule {
}
