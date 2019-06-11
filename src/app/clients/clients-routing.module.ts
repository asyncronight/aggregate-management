import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsListComponent } from './clients-list/clients-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':idClient/groups',
    loadChildren: () =>
      import('./groups/groups.module').then(m => m.GroupsModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {}
