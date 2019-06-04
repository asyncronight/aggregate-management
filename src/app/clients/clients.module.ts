import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientMaterialModule } from './client-material.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsAddComponent } from './clients-add/clients-add.component';

@NgModule({
  declarations: [ClientsListComponent, ClientsAddComponent],
  imports: [CommonModule, ClientMaterialModule, ClientsRoutingModule],
  entryComponents: [ClientsAddComponent]
})
export class ClientsModule {}
