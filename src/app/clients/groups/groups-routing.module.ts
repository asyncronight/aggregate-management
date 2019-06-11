import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsListComponent } from './groups-list/groups-list.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GroupsListComponent
  },
  {
    path: ':idGroup/trucks',
    loadChildren: () =>
      import('./trucks/trucks.module').then(m => m.TrucksModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
