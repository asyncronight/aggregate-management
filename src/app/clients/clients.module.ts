import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientMaterialModule } from './clients-material.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ClientsListComponent, ClientsAddComponent],
  imports: [
    CommonModule,
    ClientMaterialModule,
    FlexLayoutModule,
    ClientsRoutingModule,
    FormsModule,
    AngularFirestoreModule
  ],
  entryComponents: [ClientsAddComponent]
})
export class ClientsModule {}
