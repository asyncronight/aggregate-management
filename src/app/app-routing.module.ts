import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'clients',
    loadChildren: () =>
      import('./clients/clients.module').then(m => m.ClientsModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./groups/groups.module').then(m => m.GroupsModule),
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
