import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LawEnforcementRoutingModule} from './law-enforcement-routing.module';
import {LawEnforcementComponent} from './law-enforcement.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        LawEnforcementComponent
    ],
    imports: [
        CommonModule,
        LawEnforcementRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class LawEnforcementModule {
}
