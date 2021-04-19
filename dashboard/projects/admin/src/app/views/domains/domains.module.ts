import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DomainsRoutingModule} from './domains-routing.module';
import {DomainsComponent} from './domains.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        DomainsComponent
    ],
    imports: [
        CommonModule,
        DomainsRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DomainsModule {
}
