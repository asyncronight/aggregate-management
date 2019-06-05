
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
    {
      path: '',
      component: null, // Todo : Change that after adding list component
      canActivate: [AuthGuard]
    }
  ];

NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class GroupsRoutingModule {

}