import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupMaterialModule } from './group-material.module';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    AngularFirestoreModule,
    GroupMaterialModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
