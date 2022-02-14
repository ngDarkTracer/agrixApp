import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgriculteurComponent } from './agriculteur.component';

const routes: Routes = [{ path: '', component: AgriculteurComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgriculteurRoutingModule { }
