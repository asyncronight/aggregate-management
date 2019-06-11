import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrucksListComponent } from './trucks-list/trucks-list.component';

const routes: Routes = [
  {
    path: '',
    component: TrucksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrucksRoutingModule {}
