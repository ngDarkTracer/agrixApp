import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {AuthGuard} from "./auth/auth.guard";
import {SignupComponent} from "./auth/signup/signup.component";

const routes: Routes = [
  { path: '', component: SigninComponent, pathMatch: 'full' },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'main', canActivate: [AuthGuard], component: MainComponent, children: [
      { path: 'agriculteur', loadChildren: () => import('./agriculteur/agriculteur.module').then(m => m.AgriculteurModule) },
      { path: 'plante', loadChildren: () => import('./plante/plante.module').then(m => m.PlanteModule) },
      { path: 'projet', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
      { path: '', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), pathMatch: 'full' }
    ]},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
