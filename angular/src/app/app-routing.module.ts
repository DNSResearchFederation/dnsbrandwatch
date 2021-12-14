import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {LoginComponent} from './views/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {BrandsComponent} from './views/brands/brands.component';
import {NotificationGroupsComponent} from './views/notification-groups/notification-groups.component';
import {AlertGroupsComponent} from './views/alert-groups/alert-groups.component';
import {EditNotificationGroupComponent} from './views/notification-groups/edit-notification-group/edit-notification-group.component';
import {EditAlertGroupComponent} from './views/alert-groups/edit-alert-group/edit-alert-group.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {MyAccountComponent} from './views/my-account/my-account.component';
import {WatchDomainsComponent} from './views/watch-domains/watch-domains.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'brands',
        component: BrandsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'brands/:brandId',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notification-groups',
        component: NotificationGroupsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notification-groups/:id',
        component: EditNotificationGroupComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'alert-groups',
        component: AlertGroupsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'alert-groups/:id',
        component: EditAlertGroupComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'my-account',
        component: MyAccountComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'watch-domains',
        component: WatchDomainsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
