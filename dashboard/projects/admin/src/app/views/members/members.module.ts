import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MembersRoutingModule} from './members-routing.module';
import {MembersComponent} from './members.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [
        MembersComponent
    ],
    imports: [
        CommonModule,
        MembersRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class MembersModule {
}
