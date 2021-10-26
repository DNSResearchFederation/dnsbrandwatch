import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {SessionInterceptor} from './session.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgKiniAuthModule} from 'ng-kiniauth';
import {NgKinintelModule} from 'ng-kinintel';
import {environment} from '../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { BrandsComponent } from './views/brands/brands.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotificationGroupsComponent } from './views/notification-groups/notification-groups.component';
import { AlertGroupsComponent } from './views/alert-groups/alert-groups.component';
import { EditAlertGroupComponent } from './views/alert-groups/edit-alert-group/edit-alert-group.component';
import { EditNotificationGroupComponent } from './views/notification-groups/edit-notification-group/edit-notification-group.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        BrandsComponent,
        NotificationGroupsComponent,
        AlertGroupsComponent,
        EditAlertGroupComponent,
        EditNotificationGroupComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatBadgeModule,
        MatChipsModule,
        MatDialogModule,
        HttpClientModule,
        NgKinintelModule.forRoot({
            backendURL: environment.accountURL
        }),
        NgKiniAuthModule.forRoot({
            guestHttpURL: `${environment.backendURL}/guest`,
            accessHttpURL: `${environment.backendURL}/account`
        }),
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SessionInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
