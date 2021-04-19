import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarsComponent } from './registrars.component';

const routes: Routes = [{ path: '', component: RegistrarsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrarsRoutingModule { }
