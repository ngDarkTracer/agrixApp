import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule), pathMatch: 'full' },
  { path: 'projet', loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule) },
  { path: 'agriculteur', loadChildren: () => import('./agriculteur/agriculteur.module').then(m => m.AgriculteurModule) },
  { path: 'plante', loadChildren: () => import('./plante/plante.module').then(m => m.PlanteModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
