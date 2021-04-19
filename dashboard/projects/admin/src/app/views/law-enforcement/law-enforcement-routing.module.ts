import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LawEnforcementComponent } from './law-enforcement.component';

const routes: Routes = [{ path: '', component: LawEnforcementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawEnforcementRoutingModule { }
