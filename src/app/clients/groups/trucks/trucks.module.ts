import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { TrucksMaterialModule } from './trucks-material.module';
import { TrucksRoutingModule } from './trucks-routing.module';
import { TrucksListComponent } from './trucks-list/trucks-list.component';
import { TrucksAddComponent } from './trucks-add/trucks-add.component';

@NgModule({
  declarations: [TrucksListComponent, TrucksAddComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    AngularFirestoreModule,
    TrucksMaterialModule,
    TrucksRoutingModule
  ],
  entryComponents: [TrucksAddComponent]
})
export class TrucksModule {}
