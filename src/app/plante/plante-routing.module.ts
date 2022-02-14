import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanteComponent } from './plante.component';

const routes: Routes = [{ path: '', component: PlanteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanteRoutingModule { }
