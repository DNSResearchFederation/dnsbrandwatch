import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrarsRoutingModule} from './registrars-routing.module';
import {RegistrarsComponent} from './registrars.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        RegistrarsComponent
    ],
    imports: [
        CommonModule,
        RegistrarsRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class RegistrarsModule {
}
