import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'agriculteur', loadChildren: () => import('./agriculteur/agriculteur.module').then(m => m.AgriculteurModule) },
  { path: 'plante', loadChildren: () => import('./plante/plante.module').then(m => m.PlanteModule) },
  { path: 'projet', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
  { path: '', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
