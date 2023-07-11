import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './components/auth/auth.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'user-dashboard', pathMatch: 'full', component: UserDashboardComponent },
  { path: 'admin-dashboard', pathMatch: 'full', component: AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
