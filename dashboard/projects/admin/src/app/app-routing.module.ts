import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'domains',
        loadChildren: () => import('./views/domains/domains.module').then(m => m.DomainsModule)
    },
    {
        path: 'registrars',
        loadChildren: () => import('./views/registrars/registrars.module').then(m => m.RegistrarsModule)
    },
    {
        path: 'law-enforcement',
        loadChildren: () => import('./views/law-enforcement/law-enforcement.module').then(m => m.LawEnforcementModule)
    },
    {
        path: 'members',
        loadChildren: () => import('./views/members/members.module').then(m => m.MembersModule)
    },
    {
        path: 'my-account',
        loadChildren: () => import('./views/my-account/my-account.module').then(m => m.MyAccountModule)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
